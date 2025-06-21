import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import os from 'os'
import path from 'path'
import { experimental_transcribe as transcribe } from 'ai'
import { openai } from '@ai-sdk/openai'

export const maxDuration = 60

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('video') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No video file provided' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const tempDirectory = os.tmpdir()
    const inputPath = path.join(
      tempDirectory,
      `input_${Date.now()}_${file.name}`
    )
    const outputPath = path.join(tempDirectory, `audio_${Date.now()}.mp3`)

    try {
      await fs.writeFile(inputPath, buffer)

      const ffmpegCommand = [
        'ffmpeg',
        '-i',
        `"${inputPath}"`,
        '-vn',
        '-acodec mp3',
        '-ab 64k',
        '-ar 16000',
        '-ac 1',
        '-y',
        `"${outputPath}"`,
      ].join(' ')

      console.log('Executing ffmpeg command:', ffmpegCommand)
      await execAsync(ffmpegCommand)

      const ffprobeCommand = `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${inputPath}"`
      const { stdout: durationOutput } = await execAsync(ffprobeCommand)
      const duration = Math.round(parseFloat(durationOutput.trim()) || 0)

      const audioBuffer = await fs.readFile(outputPath)

      console.log(`Original video size: ${buffer.length} bytes`)
      console.log(`Extracted audio size: ${audioBuffer.length} bytes`)
      console.log(`Video duration: ${duration} seconds`)

      const transcription = await transcribe({
        model: openai.transcription('whisper-1'),
        audio: audioBuffer,
      })

      await fs.unlink(inputPath).catch(() => {})
      await fs.unlink(outputPath).catch(() => {})

      return NextResponse.json({
        transcript: transcription.text,
        duration: duration,
        originalSize: buffer.length,
        audioSize: audioBuffer.length,
        compressionRatio: Math.round(
          (1 - audioBuffer.length / buffer.length) * 100
        ),
      })
    } catch (error) {
      await fs.unlink(inputPath).catch(() => {})
      await fs.unlink(outputPath).catch(() => {})
      throw error
    }
  } catch (error) {
    console.error('Transcription error:', error)
    return NextResponse.json(
      { error: 'Failed to transcribe video' },
      { status: 500 }
    )
  }
}

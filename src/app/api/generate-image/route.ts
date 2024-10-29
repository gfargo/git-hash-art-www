import { generateImageFromHash } from 'git-hash-art';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'No input provided' }, { status: 400 });
  }

  console.log('Generating image for input:', input);

  try {
    const imageBuffer = await generateImageFromHash(input);

    console.log('Generated image for input:', input);

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': 'inline; filename="git-hash-art.png"',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}

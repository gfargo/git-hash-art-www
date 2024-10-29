'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const generateImage = useMutation({
    mutationFn: async (input: string) => {
      const response = await fetch(
        `/api/generate-image?input=${encodeURIComponent(input)}`
      );
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }
      return response.blob();
    },
    onSuccess: (data) => {
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateImage.mutate(input);
  };

  return (
    <div className="container mx-auto flex h-full grow items-center justify-center px-4 py-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Git Hash Art Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter GitHub URL or commit hash"
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full"
              disabled={generateImage.isPending}
            >
              {generateImage.isPending ? 'Generating...' : 'Generate Image'}
            </Button>
          </form>
          {generateImage.isError && (
            <p className="mt-4 text-red-500">
              Error: {generateImage.error.message}
            </p>
          )}
          {imageUrl && (
            <div className="mt-6">
              <Image
                src={imageUrl}
                alt="Generated Git Hash Art"
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

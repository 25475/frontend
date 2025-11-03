import React from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  objectFit?: 'cover' | 'contain' | 'fill'
}

export default function ResponsiveImage({
  src,
  alt,
  className = '',
  fallbackSrc,
  aspectRatio = 'landscape',
  objectFit = 'cover'
}: ResponsiveImageProps) {
  const aspectRatioClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  }[aspectRatio]

  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  }[objectFit]

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${objectFitClass} transition-transform duration-300 hover:scale-105`}
        onError={(e) => {
          if (fallbackSrc) {
            const target = e.target as HTMLImageElement
            target.src = fallbackSrc
          }
        }}
        loading="lazy"
      />
    </div>
  )
}
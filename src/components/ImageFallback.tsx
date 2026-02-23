"use client";

import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
    containerStyle?: React.CSSProperties;
    iconSize?: number;
    fill?: boolean;
    sizes?: string;
}

export default function ImageFallback({
    src,
    alt,
    fallbackText,
    containerStyle,
    iconSize = 24,
    style,
    fill,
    sizes,
    ...props
}: ImageFallbackProps) {
    const [hasError, setHasError] = useState(false);

    if (hasError || !src) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f5f5f5',
                    color: '#999',
                    width: style?.width || '100%',
                    height: style?.height || '100%',
                    borderRadius: style?.borderRadius || 8,
                    ...containerStyle
                }}
            >
                <ImageIcon size={iconSize} style={{ opacity: 0.5, marginBottom: fallbackText ? 8 : 0 }} />
                {fallbackText && (
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, textAlign: 'center', padding: '0 8px' }}>
                        {fallbackText}
                    </span>
                )}
            </div>
        );
    }

    const imageStyle: React.CSSProperties = {
        ...style,
        ...(fill ? { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%' } : {})
    };

    return (
        <img
            src={src}
            alt={alt || "Image"}
            onError={() => setHasError(true)}
            style={imageStyle}
            sizes={sizes}
            {...props}
        />
    );
}

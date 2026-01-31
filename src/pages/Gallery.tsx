import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { places } from '@/lib/data';

const Gallery = () => {
    // Create a larger array of images for the gallery
    const images = [...places, ...places, ...places].map((p, i) => ({
        src: p.image,
        alt: p.name,
        id: i
    }));

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Photo Gallery</h1>
            <p className="text-muted-foreground mb-8">Glimpses of the divine land.</p>

            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}>
                <Masonry gutter="16px">
                    {images.map((img) => (
                        <div key={img.id} className="relative group overflow-hidden rounded-xl">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-medium">{img.alt}</span>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
};

export default Gallery;

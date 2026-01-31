import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogs } from '@/lib/data';
import { Button } from '@/components/ui/button';

const Blog = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-serif font-bold mb-2">Spiritual Knowledge Hub</h1>
            <p className="text-muted-foreground mb-8">Stories, history, and travel guides from Braj.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="h-48 overflow-hidden">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                        <CardContent className="p-6">
                            <div className="flex items-center text-xs text-muted-foreground mb-2 space-x-2">
                                <span>{blog.date}</span>
                                <span>•</span>
                                <span>{blog.author}</span>
                            </div>
                            <h3 className="text-xl font-bold font-serif mb-2 line-clamp-2">{blog.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {blog.excerpt}
                            </p>
                            <Button variant="link" className="p-0 h-auto">Read More &rarr;</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Blog;

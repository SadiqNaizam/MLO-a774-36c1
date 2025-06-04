import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { PlayCircle, Music2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MediaGridCardProps {
  id: string | number;
  imageUrl?: string;
  title: string;
  subtitle?: string;
  type: 'album' | 'playlist' | 'artist' | 'track' | 'genre';
  onClick?: (id: string | number, type: MediaGridCardProps['type']) => void;
  className?: string;
}

const MediaGridCard: React.FC<MediaGridCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  type,
  onClick,
  className,
}) => {
  console.log("Rendering MediaGridCard:", title, type);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id, type);
      console.log("MediaGridCard clicked:", id, type);
    }
  };

  const imagePlaceholder = (
    <div className="flex h-full w-full items-center justify-center rounded-md bg-muted">
      <Music2 className="h-10 w-10 text-muted-foreground" />
    </div>
  );

  return (
    <Card
      className={cn("group w-full overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer", className)}
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={type === 'artist' ? 1 / 1 : 16 / 9} className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide broken image
            />
          ) : null}
          {!imageUrl && imagePlaceholder}
           <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="ghost" size="icon" className="h-12 w-12 text-white hover:bg-white/20">
              <PlayCircle className="h-10 w-10" />
            </Button>
          </div>
        </AspectRatio>
        {type === 'artist' && imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 object-cover w-full h-full rounded-full transition-transform duration-300 group-hover:scale-105"
              style={{ clipPath: 'circle(50% at 50% 50%)' }}
            />
        )}
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <CardTitle className="text-base sm:text-lg font-semibold line-clamp-1">{title}</CardTitle>
        {subtitle && (
          <CardDescription className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mt-1">
            {subtitle}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaGridCard;
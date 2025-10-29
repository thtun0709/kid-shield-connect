import { useState } from 'react';
import { Search, X, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Demo videos - sau này có thể thay bằng YouTube Data API
const kidsVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Baby Shark Dance',
    thumbnail: 'https://img.youtube.com/vi/XqZsoesa55w/maxresdefault.jpg',
    channel: 'Pinkfong Baby Shark',
    videoId: 'XqZsoesa55w'
  },
  {
    id: '2',
    title: 'ABC Song - Nursery Rhymes',
    thumbnail: 'https://img.youtube.com/vi/hq3yfQnllfQ/maxresdefault.jpg',
    channel: 'CoComelon',
    videoId: 'hq3yfQnllfQ'
  },
//   {
//     id: '3',
//     title: 'Learn Colors with Surprise Eggs',
//     thumbnail: 'https://img.youtube.com/vi/5f3f0LHecSg/maxresdefault.jpg',
//     channel: 'Educational Videos',
//     videoId: '5f3f0LHecSg'
//   },
//   {
//     id: '4',
//     title: 'Peppa Pig Official Channel',
//     thumbnail: 'https://img.youtube.com/vi/Mf49nNM2u7U/maxresdefault.jpg',
//     channel: 'Peppa Pig',
//     videoId: 'Mf49nNM2u7U'
//   },
//   {
//     id: '5',
//     title: 'Wheels on the Bus',
//     thumbnail: 'https://img.youtube.com/vi/e_04ZrNroTo/maxresdefault.jpg',
//     channel: 'Little Baby Bum',
//     videoId: 'e_04ZrNroTo'
//   },
//   {
//     id: '6',
//     title: 'Learn Shapes and Colors',
//     thumbnail: 'https://img.youtube.com/vi/TbmI0ftWZq4/maxresdefault.jpg',
//     channel: 'Kids Learning',
//     videoId: 'TbmI0ftWZq4'
//   }
];

const YouTubeKids = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [filteredVideos, setFilteredVideos] = useState(kidsVideos);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredVideos(kidsVideos);
    } else {
      const filtered = kidsVideos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  };

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Tìm kiếm video cho bé..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Video Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredVideos.map((video) => (
            <Card
              key={video.id}
              className="cursor-pointer transition-all hover:scale-105 active:scale-95 overflow-hidden border-0 shadow-card"
              onClick={() => handleVideoClick(video.videoId)}
            >
              <div className="relative aspect-video bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="h-6 w-6 text-red-500" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                  {video.title}
                </h3>
                <p className="text-xs text-muted-foreground">{video.channel}</p>
              </div>
            </Card>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Không tìm thấy video nào</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] p-0">
          <div className="w-full h-full p-4">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&modestbranding=1&rel=0&fs=1`}
              className="w-full h-full rounded-lg border-0"
              title="YouTube Video Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YouTubeKids;

type VideoFormats = {
  url: string;
  title: string;
  thumbnail: string;
  duration: string;
  // subtitles: Record<string, string>;
  // captions: Record<string, string>[];
  video_formats: Record<string, string>[];
  audio_formats: Record<string, string>[];
};

export default VideoFormats;

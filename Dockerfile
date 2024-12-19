# Use the official Node.js image as the base
FROM node:23.1.0

# Set the working directory
WORKDIR /app

# Install necessary system dependencies and remove cache
RUN apt-get update && apt-get install -y curl python3 python3-pip
RUN rm -rf /var/lib/apt/lists/*

# mkdir command in utils
RUN mkdir -p ./utils/command

# Install yt-dlp as a standalone executable
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o ./utils/command/yt-dlp
RUN chmod a+rx ./utils/command/yt-dlp

# Download yt-dlp ffmpeg-build, extract it and delete original downloaded file
RUN curl -L https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz -o ./utils/command/ffmpeg.tar.xz
RUN mkdir -p ./utils/command/ffmpeg
RUN tar -xvf ./utils/command/ffmpeg.tar.xz -C ./utils/command/ffmpeg --strip-components=1
RUN rm ./utils/command/ffmpeg.tar.xz

# Create the yt-dlp.conf file with the specified content
# using >> appends content to the file and not overwrite it
RUN echo "-o ./public/downloads/%(title)s-%(height)sp-%(format_id)s.%(ext)s\n" >./utils/command/yt-dlp.conf
RUN echo "--ffmpeg-location ./utils/command/ffmpeg/bin/ffmpeg\n" >>./utils/command/yt-dlp.conf
RUN echo "--cookies ./utils/cookies.txt\n" >>./utils/command/yt-dlp.conf

# Copy project files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app (this will create the .next directory)
RUN npm run build

# Expose the port used by Next.js
EXPOSE 3000

# Run the Next.js application
CMD ["npm", "run", "start"]

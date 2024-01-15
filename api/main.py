from flask import Flask, request, jsonify
from pytube import YouTube
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*')

@app.route('/api/flask/convert', methods=['GET'])
def convert():
    youtubeId = request.args.get('youtubeId')

    if not youtubeId:
        return jsonify({"status": False, "error": "YouTube ID not specified"})

    try:
        # Get YouTube video info using pytube
        video_url = f'https://www.youtube.com/watch?v={youtubeId}'
        yt = YouTube(video_url)

        # Get the audio stream URL
        audio_stream_url = yt.streams.filter(only_audio=True).first().url

        # Get all audio stream URLs
        all_audio_stream_urls = [stream.url for stream in yt.streams.filter(only_audio=True)]

        # Get video stream URL
        video_stream_url = yt.stream.filter(file_extension='mp4').first().url

        # Return the audio stream URL and captions
        return jsonify({
            "status": True, 
            "audio_stream_url": audio_stream_url,
            "all_audio_stream_urls": all_audio_stream_urls,
            "video_stream_url": video_stream_url
        })

    except Exception as e:
        return jsonify({"status": False, "error": str(e)})
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8888)

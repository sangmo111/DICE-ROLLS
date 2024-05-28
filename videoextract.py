# example.py

from videocr import get_subtitles, save_subtitles_to_file

if __name__ == '__main__':
    # Path to your local video file
    video_path = '/Users/jinpa/Downloads/Nyingtam_final_jinpa_jungney.mov'

    # Extract subtitles and print them
    subtitles = get_subtitles(video_path, lang='eng', sim_threshold=70, conf_threshold=65)
    print(subtitles)

    # Save subtitles to an SRT file
    save_subtitles_to_file(video_path, 'subtitle.srt', lang='eng', sim_threshold=70, conf_threshold=65)

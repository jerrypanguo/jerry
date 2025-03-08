/**
 * 简单的音频播放器
 */
class AudioPlayer {
    constructor() {
        this.isPlaying = false;
        this.currentTrack = 0;
        this.audioElement = null;
        this.tracks = [
            {
                title: 'Villa Lobos Etude No.7 - Yuze Pan',
                file: 'static/audio/Villa Lobos Etude No.7.mp3',
                duration: '2:17'
            }
            // 可以添加更多音轨
        ];

        this.initPlayer();
        this.loadTrack(this.currentTrack);
        
        // 自动显示当前曲目名
        document.querySelectorAll('.track-name').forEach(el => {
            el.textContent = this.tracks[this.currentTrack].title;
        });
    }

    initPlayer() {
        // 创建音频元素
        this.audioElement = document.createElement('audio');
        this.audioElement.setAttribute('preload', 'auto');
        document.body.appendChild(this.audioElement);

        // 获取控制按钮
        this.playBtn = document.querySelector('.play-btn');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.trackName = document.querySelector('.track-name');
        this.trackTime = document.querySelector('.track-time');

        // 添加事件监听
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.audioElement.addEventListener('timeupdate', () => this.updateTime());
        this.audioElement.addEventListener('ended', () => this.nextTrack());
        
        // 为音频加载错误添加处理
        this.audioElement.addEventListener('error', (e) => {
            console.error('音频加载错误:', e);
            this.trackTime.textContent = '加载错误';
        });
    }

    loadTrack(index) {
        // 载入指定的音轨
        const track = this.tracks[index];
        this.audioElement.src = track.file;
        this.trackName.textContent = track.title;
        this.trackTime.textContent = `0:00/${track.duration}`;
        this.currentTrack = index;
        
        // 重置播放状态
        if (this.isPlaying) {
            this.pause();
            setTimeout(() => this.play(), 300); // 短暂延迟后播放,确保加载
        }
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.playBtn.textContent = '⏸';
        const playPromise = this.audioElement.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('播放错误:', error);
                // 自动尝试切换到下一首
                if (error.name === 'NotAllowedError') {
                    // 用户交互限制,不自动切换
                    this.pause();
                } else {
                    this.nextTrack();
                }
            });
        }
        
        this.isPlaying = true;
    }

    pause() {
        this.playBtn.textContent = '▶';
        this.audioElement.pause();
        this.isPlaying = false;
    }

    prevTrack() {
        let index = this.currentTrack - 1;
        if (index < 0) index = this.tracks.length - 1;
        this.loadTrack(index);
    }

    nextTrack() {
        let index = this.currentTrack + 1;
        if (index >= this.tracks.length) index = 0;
        this.loadTrack(index);
        if (this.isPlaying) this.play();
    }

    updateTime() {
        // 更新当前时间显示
        const current = this.audioElement.currentTime;
        const minutes = Math.floor(current / 60);
        const seconds = Math.floor(current % 60).toString().padStart(2, '0');
        const duration = this.tracks[this.currentTrack].duration;
        this.trackTime.textContent = `${minutes}:${seconds}/${duration}`;
    }
}

// 页面加载完成后初始化播放器
document.addEventListener('DOMContentLoaded', () => {
    new AudioPlayer();
}); 

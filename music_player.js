
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio = $('#audio');
const playBtn = $('.fa-play');
const pauseBtn = $('.fa-pause');
const playItem = $('#pause');
const cd = $('.song-photo');
const progress = $('#progress');
const next = $('#next');
const prev = $('#prev');
const replay = $('#replay');
const playList = $('.play-list');
const random = $('#random');
const fullPlayList = $$('.play-list');
const mute = $('.mute');
const volumne = $('#volumne');
const moon = $('.moon-container');
const sun = $('.sun-container');
const container = $('.container');
const app = {
     isNightMode : false,
     isMute : false,
     isRandom: false,
     isPlaying : false,
     isRepeat: false,
     currentIndex : 1,
     songs : [
        {
            name: "Monody",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Another Love",
            singer : "Tom Odel",
            audio_path : "/song-audio/Tom\ Odell\ -\ Another\ Love.mp3",
            image : "/song-photo/60808733c92a4e3dbde94b85947f91c3~c5_500x500.jpg"
        },
        {
            name: "Car's Outside",
            singer : "James Arthur",
            audio_path : "/song-audio/onlymp3.to\ -\ James\ Arthur\ -\ Car\ s\ Outside\ Lyrics\ -xUT3ZcbVWmQ-192k-1688476142.mp3",
            image : "/song-photo/1661484537760_640.jpg"
        },
        {
            name: "Summer Time",
            singer : "K-391",
            audio_path : "/song-audio/X2Download.app\ -\ K-391\ -\ Summertime\ [Sunshine]\ \(128\ kbps\).mp3",
            image : "/song-photo/maxresdefault.jpg"
        },
        {
            name: "Nevada",
            singer : "Vicetone",
            audio_path : "/song-audio/onlymp3.to\ -\ Vicetone\ -\ Nevada\ ft\ Cozi\ Zuehlsdorff\ -AnMhdn0wJ4I-192k-1688476192.mp3",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Nevada",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Nevada",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Nevada",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Nevada",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
        {
            name: "Nevada",
            singer : "TheFatRat",
            audio_path : "/song-audio/X2Download.app-TheFatRat\ -\ Monody\ \(feat.\ Laura\ Brehm\)-\(480p\).mp4",
            image : "/song-photo/1509514275012_640.jpg"
        },
    ],
    
    render: function() {
        const htmls = this.songs.map((song,index) => {
            return `<div class="play-item" data-index=${index}>
                        <div class="item-photo" style="background-image: url('${song.image}');"></div>
                        <div class="item-info">
                            <h4 class="item-name">${song.name}</h4>
                            <div class="item-songwriter">${song.singer}</div>
                        </div>
                        <div class="item-option">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>`
        })

        html  = $('.play-list');
        html.innerHTML += htmls.join('');
    },
    // Dùng để xử lý các sự kiện diễn ra trong trang
    handleEvent : function() { 
        const _this = this;
        //Xử lý CD quay dừng:

        const cdSpinning =  cd.animate([{transform : "rotate(360deg)"}], {
            duration: 10000,
            iterations : Infinity
        })
        cdSpinning.pause();

        const playList = $('.play-list'); 

        // Xử lý phóng to thu nhỏ CD:
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            console.log(window.scrollY);
            const scrollTop = window.scrollY || document.playList.scrollTop;
            const newWidth = cdWidth - scrollTop ;
            console.log(cdWidth);
            cd.style.width = newWidth > 0 ? newWidth + "px" : 0 ;
            cd.style.height = newWidth > 0 ? newWidth + "px" : 0 ;
        };

        // Bật/ tắt audio khi ấn chơi và dừng bài hát

        playBtn.onclick = function(){
            if(!_this.isPlaying){
                audio.play();
            }
        };

        pauseBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }
        }

        // Thay đổi trạng thái của nút bấm dừng/phát
        audio.onplay = function () {
            _this.isPlaying = true;
            pauseBtn.style.display = 'inline-block';
            playBtn.style.display = 'none';
            cdSpinning.play();
        }
        
        audio.onpause = function() {
            _this.isPlaying = false;
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'inline-block'
            cdSpinning.pause();
        }

        // Hiển thị thời lượng bài hát trên thanh progress:

        audio.ontimeupdate = function() {
            if(audio.duration) { // trả về thời lượng tổng của audio
                const progressPercent = (audio.currentTime / audio.duration ) * 100;
                progress.value = progressPercent;
            }
        }

        // Thay đổi thời gian play video trên thanh progress 

        progress.oninput = function(e) { // call function when user change sth in the input
            const seekTime = e.target.value * (audio.duration / 100);
            audio.currentTime = seekTime; 
        }

        // Thay đổi bài hát khi ấn phím next

        next.onclick = function(){
            if(!_this.isRandom){
            _this.nextSong();
            }
            else{
                _this.setRandomSongs();
            }
            _this.loadCurrentSong();
            _this.renderPlaylist();
            audio.play();
        }

        // Thay đổi bài hát khi bấm phím prev

        prev.onclick = function(){
            if(!_this.isRandom){
            _this.prevSong();
            }
            else{
                 _this.setRandomSongs();
            }
            _this.loadCurrentSong();
            _this.renderPlaylist();
            audio.play();
        }

        // Thay khi bấm phím replay

        replay.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            replay.classList.toggle('active2',_this.isRepeat);
        }

        // Xử lý khi ở chế độ replay:

        audio.onended = function() {
            if(_this.isRepeat){
                audio.play();
            }
            else{
                next.click();
            }
        }

        //  Xử lý khi ấn vào bài hát ở playlist

        playList.onclick = function(e) {
            const List = $$('.play-item');
            List.forEach((list,value) => {list.classList.remove('active');
            list.querySelector('.item-songwriter').style.color = 'rgba(65, 65, 65, 0.45)';
            });
            const currentSong = e.target.closest('.play-item')
            _this.currentIndex = currentSong.dataset.index;  // khi dùng data-tên thì dataset.tên sẽ lấy gtri
            _this.loadCurrentSong();
            currentSong.querySelector('.item-songwriter').style.color = '#fff';
            currentSong.classList.add('active'); 
            currentSong.scrollIntoView({behavior : "smooth" , inline : "nearest"}); 
            audio.play();
        }

        // Xử lý khi bấm và sử dụng chế độ random:

        random.onclick = function () {
            _this.isRandom = !_this.isRandom;
            random.classList.toggle('active2',_this.isRandom);
        }

        // Xử lý chế độ khi chọn mute

        mute.onclick = function () {
            const volumeDefaultValue = 100;
            _this.isMute = !_this.isMute;
            if(_this.isMute) {
                $('#mute').style.display = 'none';
                $('#un-mute').style.display = 'block';
                audio.volume = 0;
                volumne.value = 0;
            }
            else{
                $('#mute').style.display = 'block';
                $('#un-mute').style.display = 'none';
                audio.volume = (volumeDefaultValue/ 100);
                volumne.value = volumeDefaultValue;
            }  
        }

        // Xử lý khi thay đổi thanh cuộn âm thanh

        volumne.oninput = function () {
            audio.volume = (this.value / 100 );
            console.log(audio.volume);
            if(audio.volume === 0){
                $('#un-mute').style.display = 'block';
                $('#mute').style.display = 'none';
            }
            else{
                $('#un-mute').style.display = 'none';
                $('#mute').style.display = 'block';
            }
        }


        // Xử lý chỉnh mode
        moon.onclick = function() {
            if(!(_this.isNightMode)){
                _this.isNightMode = true;
                moon.classList.add('enabled');
                sun.classList.remove('enabled');
                container.classList.add('dark_mode');
                volumne.style.backgroundColor = 'aliceblue';
                $('#mute').style.color = 'aliceblue';
                $('#un-mute').style.color = 'aliceblue';
                $('.dash-board').style.backgroundColor = 'rgba(65, 65, 65, 0.45)';
                $('.dash-board').style.color = '#fff';
                $('#volumne::-webkit-slider-thumb').style.color = 'blue';
            }
        }

        sun.onclick = function() {
            if(_this.isNightMode){
                _this.isNightMode = false;
                moon.classList.remove('enabled');
                sun.classList.add('enabled');
                container.classList.remove('dark_mode');
                volumne.style.backgroundColor = 'rgba(65, 65, 65, 0.45)';
                $('#mute').style.color = 'rgba(65, 65, 65, 0.879)';
                $('#un-mute').style.color = 'rgba(65, 65, 65, 0.879)';
                $('.dash-board').style.backgroundColor = '#fff';
                $('.dash-board').style.color = 'black';
                $('#volumne::-webkit-slider-thumb').style.color = 'blue';
            }
        }



        





        



        
    },


    // Sinh ra số ngẫu nhiên cho bài hát được chọn
    setRandomSongs  : function () {
        let randomValue;  
        do{
            randomValue = Math.ceil(Math.random()*(this.songs.length-1));
            }while(randomValue === this.currentIndex);
            this.currentIndex = randomValue;
            console.log(randomValue);
    },


    // Hàm load và nhập audio song hiện tại vào trong UI
    loadCurrentSong : function() {
        $('.song-name').innerText = this.songs[this.currentIndex].name;
        cd.style.backgroundImage = `url('${this.songs[this.currentIndex].image}')`;
        audio.src = this.songs[this.currentIndex].audio_path;
    },

    // Hàm chuyển bài kế tiếp 
    nextSong : function() {
        if(this.currentIndex >= this.songs.length - 1 ){
            console.log(this.songs.length);
            this.currentIndex = 0;
        }
        else{
            this.currentIndex++ ;
        }
    },

    // Hàm chuyển bài trước đó
    prevSong : function() {
        if(this.currentIndex <= 0 ){
            this.currentIndex = this.songs.length - 1;
        }
        else{
            this.currentIndex-- ;
        }
    },

    //render lại phay list khi chuyển bài hát:
    renderPlaylist : function(){
        const _this = this;
        const nodeList = $$('.play-item');
                const List = Array.from(nodeList);
                List.forEach((list,value) => {list.classList.remove('active');
                list.querySelector('.item-songwriter').style.color = 'rgba(65, 65, 65, 0.45)';
                });
                const currentSong = List.find(function(list,value){
                    return list.dataset.index == _this.currentIndex;
                })
                currentSong.querySelector('.item-songwriter').style.color = '#fff';
                currentSong.classList.add('active'); 
                currentSong.scrollIntoView({behavior : "smooth" , inline : "nearest"});
    },

    start : function() {
        this.render(); // để gọi render của thằng app này

        // Xử lý sự kiện:
        this.handleEvent();


        // tải bài hát vào khi hoàn thiện xong UI
        this.loadCurrentSong();
    }
}

app.start();
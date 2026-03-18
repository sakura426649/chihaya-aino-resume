// Main script for Chihaya Aino resume

document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-theme');
        updateThemeToggleIcon(true);
    }

    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleIcon(isDark);
    });

    function updateThemeToggleIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        if (isDark) {
            icon.className = 'fas fa-sun';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i> 切换主题';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.innerHTML = '<i class="fas fa-moon"></i> 切换主题';
        }
    }

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0';

                // Trigger reflow
                skillBar.offsetHeight;

                // Animate to the target width
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-in-out';
                    skillBar.style.width = width;
                }, 300);

                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));

    // Add click effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Show a simple alert (in a real site, this would navigate)
            const platform = this.getAttribute('aria-label').toLowerCase();
            alert(`这将链接到千早爱音的${platform}页面（仅演示）`);
        });
    });

    // Add hover effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        footerText.textContent = footerText.textContent.replace('2024', currentYear);
    }

    // Add a subtle animation to the avatar on load
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.classList.add('avatar-loading');

        // Force reflow to ensure animation starts
        avatar.offsetHeight;

        setTimeout(() => {
            avatar.classList.remove('avatar-loading');
        }, 300);
    }

    // Add a greeting in console
    console.log('%c🎸 千早爱音个人简历', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
    console.log('%c感谢查看我的个人简历页面！', 'color: #6a5acd;');

    // Music Player Functionality
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    const musicStatus = document.querySelector('.music-status');
    const musicPlayer = document.querySelector('.music-player');

    if (backgroundMusic && musicToggle) {
        // Set initial volume
        backgroundMusic.volume = volumeSlider.value / 100;

        // Volume control
        volumeSlider.addEventListener('input', function() {
            backgroundMusic.volume = this.value / 100;
            updateVolumeIcon(this.value);
        });

        function updateVolumeIcon(volume) {
            const icon = document.querySelector('.volume-control i');
            if (volume == 0) {
                icon.className = 'fas fa-volume-mute';
            } else if (volume < 50) {
                icon.className = 'fas fa-volume-down';
            } else {
                icon.className = 'fas fa-volume-up';
            }
        }

        // Toggle play/pause
        musicToggle.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });

        function playMusic() {
            backgroundMusic.play()
                .then(() => {
                    musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                    musicStatus.textContent = '正在播放';
                    musicPlayer.classList.add('music-playing');
                    console.log('🎵 音乐开始播放');
                })
                .catch(error => {
                    console.warn('Autoplay failed:', error);
                    musicStatus.textContent = '点击播放';
                    // Remove any autoplay attempt indicators
                    musicPlayer.classList.remove('autoplay-failed');
                    // Don't show alert, just update UI
                });
        }

        function pauseMusic() {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicStatus.textContent = '已暂停';
            musicPlayer.classList.remove('music-playing');
        }

        // Update status when music ends
        backgroundMusic.addEventListener('ended', function() {
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicStatus.textContent = '点击播放';
            musicPlayer.classList.remove('music-playing');
        });

        // Update status based on playback
        backgroundMusic.addEventListener('play', function() {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            musicStatus.textContent = '正在播放';
            musicPlayer.classList.add('music-playing');
        });

        backgroundMusic.addEventListener('pause', function() {
            musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            musicStatus.textContent = '已暂停';
            musicPlayer.classList.remove('music-playing');
        });

        // Try autoplay on first user interaction
        let userInteracted = false;
        const tryAutoplayOnInteraction = function() {
            if (!userInteracted && backgroundMusic.paused) {
                userInteracted = true;
                playMusic();
                // Remove listeners after first interaction
                document.removeEventListener('click', tryAutoplayOnInteraction);
                document.removeEventListener('touchstart', tryAutoplayOnInteraction);
                document.removeEventListener('keydown', tryAutoplayOnInteraction);
            }
        };

        // Listen for user interaction to start music
        document.addEventListener('click', tryAutoplayOnInteraction);
        document.addEventListener('touchstart', tryAutoplayOnInteraction);
        document.addEventListener('keydown', tryAutoplayOnInteraction);

        // Add visual hint for music autoplay
        setTimeout(() => {
            if (backgroundMusic.paused) {
                musicPlayer.classList.add('autoplay-hint');
                musicStatus.textContent = '点击任意位置播放音乐';
            }
        }, 2000);

        // Update volume icon initially
        updateVolumeIcon(volumeSlider.value);
    }

    // Handle window resize for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Update any layout-dependent elements if needed
        }, 250);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
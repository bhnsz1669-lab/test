// ============================================
// سیستم لودینگ
// ============================================
let loadingProgress = 0;
const progressBar = document.getElementById('progressBar');
const percentageText = document.getElementById('loadingPercentage');
const loadingScreen = document.getElementById('loadingScreen');

// ایجاد ذرات لودینگ
function createLoadingParticles() {
    const container = document.getElementById('loadingParticles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        const colors = ['#06b6d4', '#f59e0b', '#ec4899', '#10b981'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        container.appendChild(particle);
    }
}

// انیمیشن پیشرفت
function animateLoading() {
    const interval = setInterval(() => {
        loadingProgress += Math.random() * 8 + 2;
        
        if (loadingProgress >= 100) {
            loadingProgress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                createMainParticles();
            }, 500);
        }
        
        progressBar.style.width = loadingProgress + '%';
        percentageText.textContent = Math.floor(loadingProgress) + '%';
    }, 100);
}

// ایجاد ذرات پس‌زمینه اصلی
function createMainParticles() {
    const container = document.getElementById('particles');    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        container.appendChild(particle);
    }
}

// شروع لودینگ
window.addEventListener('DOMContentLoaded', () => {
    createLoadingParticles();
    setTimeout(animateLoading, 500);
    
    // بارگذاری کاربر ذخیره شده
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember').checked = true;
    }
});

// ============================================
// نمایش/مخفی کردن رمز عبور
// ============================================
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('src', 'https://cdn.lordicon.com/uklahlft.json');
        showToast('رمز عبور نمایش داده می‌شود', 'info');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('src', 'https://cdn.lordicon.com/kbtmbyzy.json');
        showToast('رمز عبور مخفی شد', 'info');
    }
}

// ============================================
// مدیریت فرم ورود
// ============================================
function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;    const submitBtn = document.getElementById('submitBtn');
    
    // اعتبارسنجی
    if (!username) {
        showToast('لطفاً نام کاربری را وارد کنید', 'error');
        return;
    }
    
    if (!password) {
        showToast('لطفاً رمز عبور را وارد کنید', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('رمز عبور باید حداقل ۶ کاراکتر باشد', 'error');
        return;
    }
    
    // نمایش حالت لودینگ
    submitBtn.classList.add('loading');
    submitBtn.value = 'در حال ورود...';
    
    // شبیه‌سازی درخواست سرور
    setTimeout(() => {
        // ذخیره در localStorage
        if (remember) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // بازگرداندن دکمه
        submitBtn.classList.remove('loading');
        submitBtn.value = 'ورود به حساب';
        
        // نمایش پیام موفقیت
        showToast('ورود موفقیت‌آمیز بود!', 'success');
        
        setTimeout(() => {
            document.getElementById('successOverlay').classList.add('show');
            
            // ریدایرکت بعد از ۲ ثانیه
            setTimeout(() => {
                console.log('ورود موفق:', { username });
                // window.location.href = 'dashboard.html';
            }, 2000);
        }, 500);
        
    }, 1500);
}
// ============================================
// ورود با شبکه‌های اجتماعی
// ============================================
function socialLogin(provider) {
    const names = {
        'google': 'گوگل',
        'telegram': 'تلگرام',
        'github': 'گیت‌هاب'
    };
    
    showToast(`در حال اتصال به ${names[provider]}...`, 'info');
    console.log('Social login:', provider);
}

// ============================================
// رفتن به صفحه ثبت‌نام
// ============================================
function goToSignup() {
    event.preventDefault();
    showToast('در حال انتقال به صفحه ثبت‌نام...', 'info');
    // window.location.href = 'signup.html';
}

// ============================================
// سیستم Toast Notification
// ============================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        'success': '✅',
        'error': '❌',
        'info': 'ℹ️'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <span style="font-size: 1.3rem;">${icons[type]}</span>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // حذف خودکار بعد از ۳ ثانیه
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);}

// ============================================
// افکت‌های تعاملی
// ============================================

// افکت موج روی فیلدها
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// افکت لرزش روی باکس هنگام hover
const mainBox = document.getElementById('mainBox');
mainBox.addEventListener('mouseenter', () => {
    mainBox.style.filter = 'drop-shadow(0 20px 60px rgba(6, 182, 212, 0.5))';
});

mainBox.addEventListener('mouseleave', () => {
    mainBox.style.filter = 'drop-shadow(0 15px 50px rgba(0, 0, 0, 0.8))';
});

// جلوگیری از ارسال فرم با Enter در فیلدهای خالی
document.getElementById('loginForm').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        if (!username || !password) {
            e.preventDefault();
            showToast('لطفاً همه فیلدها را پر کنید', 'error');
        }
    }
});

// پیام خوش‌آمدگویی
setTimeout(() => {
    showToast('به اپلیکیشن دوستیابی خوش آمدید! 💖', 'success');
}, 4000);
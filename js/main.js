document.querySelectorAll('.pin').forEach(function (pin) {
    pin.addEventListener('click', function (e) {
        var open = pin.classList.contains('active');
        document.querySelectorAll('.pin.active').forEach(function (p) { p.classList.remove('active'); });
        if (!open) pin.classList.add('active');
        e.stopPropagation();
    });
});

document.addEventListener('click', function () {
    document.querySelectorAll('.pin.active').forEach(function (p) { p.classList.remove('active'); });
});

var toTop = document.getElementById('toTop');

window.addEventListener('scroll', function () {
    toTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

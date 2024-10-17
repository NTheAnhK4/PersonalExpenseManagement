function showContent(contentId) {
    // Ẩn tất cả các content-item
    const contents = document.querySelectorAll('.content-item');
    contents.forEach(content => content.style.display = 'none');

    // Hiển thị content tương ứng
    const activeContent = document.getElementById(contentId);
    activeContent.style.display = 'block';
}

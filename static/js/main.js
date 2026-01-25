// Toggle mobile menu
function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

// Close menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
  });
});

// Make entire nav list item clickable
document.querySelectorAll(".nav-links li").forEach((li) => {
  li.addEventListener("click", function(e) {
    const link = this.querySelector("a");
    if (link) {
      link.click();
    }
  });
});

// Format date in IST
function formatIndiaDate(date) {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

// Sample blog posts with India dates
const blogPosts = [
  {
    title: "Understanding Historical Events",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: new Date("2026-01-15"),
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=500",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
    `,
  },
  {
    title: "Trending Topics Analysis",
    excerpt:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: new Date("2026-01-10"),
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500",
    content: `
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
      <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
    `,
  },
  {
    title: "Facts vs Fiction",
    excerpt:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: new Date("2026-01-05"),
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=500",
    content: `
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
    `,
  },
  {
    title: "Deep Dive into History",
    excerpt:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date("2025-12-28"),
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
    content: `
      <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>
    `,
  },
  {
    title: "Current Affairs Explained",
    excerpt:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    date: new Date("2025-12-20"),
    image: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=500",
    content: `
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
  },
  {
    title: "Truth Behind the Headlines",
    excerpt:
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
    date: new Date("2025-12-15"),
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=500",
    content: `
      <p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
    `,
  },
];

// Track current blog
let currentBlogIndex = -1;

// Pagination variables
let currentPage = 1;
const postsPerPage = 6;

// Calculate total pages
function getTotalPages() {
  return Math.ceil(blogPosts.length / postsPerPage);
}

// Get posts for current page
function getCurrentPagePosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;
  return blogPosts.slice(start, end);
}

// Update pagination info
function updatePagination() {
  const totalPages = getTotalPages();
  const paginationDiv = document.querySelector(".pagination");
  
  // Hide pagination if no blogs
  if (blogPosts.length === 0) {
    paginationDiv.style.display = "none";
    return;
  }
  
  paginationDiv.style.display = "flex";
  document.getElementById("pageInfo").textContent =
    `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevBtn").disabled = currentPage === 1;
  document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

// Change page
function changePage(direction) {
  const totalPages = getTotalPages();
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  renderBlogs();
  document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
}

// Open blog modal
function openBlogModal(index) {
  const actualIndex = (currentPage - 1) * postsPerPage + index;
  currentBlogIndex = actualIndex;
  const post = blogPosts[actualIndex];

  document.getElementById("modalTitle").textContent = post.title;
  document.getElementById("modalDate").textContent = formatIndiaDate(post.date);
  document.getElementById("modalContent").innerHTML = post.content;

  const modalImage = document.getElementById("modalImage");
  if (post.image) {
    modalImage.style.backgroundImage = `url(${post.image})`;
  } else {
    modalImage.style.backgroundImage =
      "linear-gradient(135deg, var(--purple), var(--red))";
  }

  document.getElementById("blogModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  document.getElementById("blogModal").classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
document.getElementById("blogModal").addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("blogModal");
    if (modal.classList.contains("active")) {
      closeModal();
    }
  }
});

// Render blog posts
function renderBlogs() {
  const blogGrid = document.getElementById("blogGrid");
  blogGrid.innerHTML = "";
  
  // Check if there are no blogs
  if (blogPosts.length === 0) {
    blogGrid.innerHTML = `
      <div style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 3rem 2rem;
        background: linear-gradient(135deg, rgba(79, 195, 247, 0.1), rgba(126, 87, 194, 0.1));
        border-radius: 15px;
        margin: 2rem 0;
      ">
        <div style="
          font-size: 4rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--dark-blue), var(--purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        ">📝</div>
        <h3 style="
          color: var(--dark-blue);
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        ">No Blogs Available</h3>
        <p style="
          color: #666;
          font-size: 1.1rem;
        ">Check back soon for new content!</p>
      </div>
    `;
    updatePagination();
    return;
  }
  
  const currentPosts = getCurrentPagePosts();

  currentPosts.forEach((post, index) => {
    const blogCard = document.createElement("div");
    blogCard.className = "blog-card";

    const imageStyle = post.image
      ? `background-image: url(${post.image});`
      : "";

    blogCard.innerHTML = `
      <div class="blog-image" style="${imageStyle}"></div>
      <div class="blog-content">
        <p class="blog-date">${formatIndiaDate(post.date)}</p>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <a href="#" class="read-more" onclick="openBlogModal(${index}); return false;">Read More →</a>
      </div>
    `;
    blogGrid.appendChild(blogCard);
  });

  updatePagination();
}

// Handle form submission
async function handleSubmit(event) {
  event.preventDefault();
  
  const submitBtn = event.target.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  
  // Disable button and show loading state
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  
  try {
    const response = await fetch('/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Thank you for your message! We will get back to you soon.');
      event.target.reset();
    } else {
      alert('Failed to send message: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    // Re-enable button
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}

// Initialize
renderBlogs();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
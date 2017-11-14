let posts = {},
    counter = 0,
    lastPage = 0,
    direction = 0,
    currentPage = 0,
    recordsPerPage = 6,
    inAnimation = zoom.in.right,
    outAnimation = zoom.out.left,
    next = document.querySelector("#next"),
    prev = document.querySelector("#previous"),
    featured = document.querySelector("#featured"),
    pagination = document.querySelector("#pagination"),
    htmlStyles = window.getComputedStyle(document.querySelector("html")),
    animationSpeed = parseInt(htmlStyles.getPropertyValue("--animation-speed").slice(0, -2)),
    req = new XMLHttpRequest();

window.addEventListener("load", function() {
  req.open("GET", "/json/posts.json", true);
  req.send();
});

req.addEventListener("load", function() {
  posts = JSON.parse(this.response);
  let paginationElement = document.querySelector("data-pager");
  paginationElement.totalRecords = posts.length;
  paginationElement.recordsPerPage = recordsPerPage;
  paginationElement.addEventListener("pageChange", function (event) {
    currentPage = event.detail.currentPage;
    lastPage = event.detail.lastPage;

    if (currentPage >= paginationElement.totalPages-1 && lastPage == 0) {
      direction = -1;
    } else if (currentPage == 0 && lastPage == paginationElement.totalPages-1) {
      direction = 1;
    } else {
      direction = currentPage > lastPage ? 1 : -1;
    }

    inAnimation = direction > 0 ? zoom.in.right : zoom.in.left;
    outAnimation = direction < 0 ? zoom.out.right : zoom.out.left;
    removePosts();
  });

  paginatePosts();
});

function removePosts() {
  if (featured.children) {
    let children = direction >= 0 ? Array.from(featured.children).reverse() : Array.from(featured.children);
    children.forEach((child, index, array) => {
      animateOut(child).then(paginatePosts);
    });
  }
}

function paginatePosts() {
  let start = currentPage * recordsPerPage;
  let end = start + recordsPerPage;
  posts.slice(start, end).forEach((post) => {
    animateIn(render(post));
  });
}

function render(post) {
  let featured__item = document.createElement("perspective-card"),
      header = document.createElement("header"),
      section = document.createElement("section"),
      mainTitle = document.createElement("h4"),
      subTitle = document.createElement("section"),
      date = document.createElement("time"),
      link = document.createElement("a");

  date.innerText = post.date;
  mainTitle.innerText = post.title;
  subTitle.innerText = post.subTitle;
  featured__item.classList.add("featured__item");
  header.classList.add("header__plain");
  section.classList.add("header__title");
  mainTitle.classList.add("header__title--main");
  subTitle.classList.add("header__title--sub");
  date.classList.add("header__date");
  section.appendChild(mainTitle);
  section.appendChild(subTitle);
  header.appendChild(section);
  header.appendChild(date);
  featured__item.appendChild(header);
  link.appendChild(featured__item);
  link.href = post.url;

  if (post.image) {
    featured__item.setAttribute("background-image", "{{ site.url }}/assets/images/" + post.image);
  }

  return link;
}

function animateIn(element) {
  if (counter < recordsPerPage) { counter++; }
  const sequenceSpeed = animationSpeed * (counter / recordsPerPage);
  const zoomSpeed = animationSpeed * recordsPerPage;

  setTimeout(() => {
    featured.appendChild(element);
    inAnimation(element, zoomSpeed, 1);
  }, sequenceSpeed);
}

function animateOut(element) {
  if (counter > 0) { counter--; }
  const sequenceSpeed = animationSpeed * (counter / recordsPerPage);
  const zoomSpeed = animationSpeed * recordsPerPage;
  const lastElement = counter == 0;
  //const last = element === featured.lastElementChild;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      outAnimation(element, zoomSpeed, 1).onfinish = () => {
        element.remove();
        if (lastElement) {
          resolve();
        }
      };
    }, sequenceSpeed);
  });
}

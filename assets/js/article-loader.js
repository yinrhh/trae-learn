class ArticleLoader {
    static instance = null;

    static getInstance() {
        if (!ArticleLoader.instance) {
            ArticleLoader.instance = new ArticleLoader();
        }
        return ArticleLoader.instance;
    }

    constructor() {
        if (ArticleLoader.instance) {
            return ArticleLoader.instance;
        }
        this.initMarked();
        ArticleLoader.instance = this;
    }

    initMarked() {
        if (typeof marked === 'undefined') {
            console.error('marked 库未加载');
            return;
        }
        
        marked.setOptions({
            highlight: function(code, lang) {
                if (typeof hljs !== 'undefined') {
                    return hljs.highlightAuto(code).value;
                }
                return code;
            },
            gfm: true,
            breaks: true,
            sanitize: false
        });
    }

    async loadArticleList() {
        try {
            const response = await fetch('./articles/index.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('加载文章列表失败:', error);
            return [];
        }
    }

    async loadArticle(filename) {
        try {
            const response = await fetch(`./articles/${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            return this.renderMarkdown(markdown);
        } catch (error) {
            console.error('加载文章失败:', error);
            return '文章加载失败';
        }
    }

    renderMarkdown(markdown) {
        if (typeof marked === 'undefined') {
            throw new Error('marked 库未加载');
        }
        return marked.parse(markdown);
    }

    generateTOC(content) {
        // 先将内容渲染到 DOM 中
        const contentElement = document.getElementById('content');
        contentElement.innerHTML = content;
        
        // 获取实际渲染后的标题元素
        const headings = contentElement.querySelectorAll('h1, h2, h3');
        const toc = document.createElement('ul');
        
        headings.forEach((heading, index) => {
            // 生成唯一ID
            const id = `heading-${index}-${heading.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            
            // 直接为文档中的标题添加ID
            heading.id = id;
            
            // 创建目录项
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase();
            
            // 添加点击事件
            a.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth' });
            });
            
            li.appendChild(a);
            toc.appendChild(li);
        });
    
        return toc;
    }
}

window.ArticleLoader = ArticleLoader;
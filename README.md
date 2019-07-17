# Journal

Next.js website that loads Wordpress API data.
Creates 2 distincts websites : [jenaiccambre.com](jenaiccambre.com) and [kyeda.app](kyeda.app)
Progressive caching: reloads the index once a day. Only the first visitor takes the load. Then caches all posts forever.
Generate social media card image based on the post title

## Changelog

### 0.2.2

- SEO: add robots.txt
- SEO: generate dynamically sitemap.xml
- Add forceReload capability

### 0.2.1

- Add gzip compression

### 0.2.0

- Layout and color change for [kyeda.app](kyeda.app)

### 0.1.0

- First release for [jenaiccambre.com](jenaiccambre.com)

## Deployment data

### Deployment - Kyeda

- rsync -avz -e 'ssh' ./journal-jenaiccambre-com <user>@<host>:/var/www/kyeda.app --exclude node_modules --exclude assets --exclude static/posts --exclude .next --exclude .git --exclude .gitignore --exclude .env
- ssh <user>@<host>
- cd /var/www/kyeda.app/journal-jenaiccambre-com
- rm -rf static/posts
- mkdir static/posts
- nvm use 10
- npm i
- npm run build
- nvm use 8
- pm2 restart kyeda.app

### Deployment - Jenaic

rsync -avz -e 'ssh' ./journal-jenaiccambre-com <user>@<host>:/var/www/jenaiccambre.com --exclude node_modules --exclude assets --exclude static/posts --exclude .next --exclude .git --exclude .gitignore --exclude .env

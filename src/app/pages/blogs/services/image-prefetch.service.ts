import { Injectable } from '@angular/core';
import { ImagePipe } from 'src/modules/image-pipe/pipes/image.pipe';
import { Blog } from '../models/blog.model';

const MARKDOWN_IMAGE = /!\[[^\]]*\]\(\s*<?([^)\s>]+)/g;
const HTML_IMAGE = /<img[^>]+src=["']([^"']+)["']/g;

/**
 * Warms the browser's HTTP cache with the images used in blog posts so they are
 * already available when a post is opened.
 */
@Injectable({
  providedIn: 'root'
})
export class ImagePrefetchService {
  private prefetched = new Set<string>();
  private imagePipe = new ImagePipe();

  extractImageUrls(body: string): string[] {
    const resolved = this.imagePipe.transform(body ?? '') ?? '';
    const urls = [...resolved.matchAll(MARKDOWN_IMAGE), ...resolved.matchAll(HTML_IMAGE)]
      .map(match => match[1]);
    return [...new Set(urls)];
  }

  prefetchBlogs(blogs: Blog[]): void {
    const urls = blogs.flatMap(blog => this.extractImageUrls(blog.body));
    this.schedule(urls.filter(url => !this.prefetched.has(url)));
  }

  private schedule(urls: string[]): void {
    if (typeof Image === 'undefined' || !urls.length) {
      return;
    }
    // One image per idle callback so the prefetch never competes with page rendering.
    const [url, ...rest] = urls;
    const run = () => {
      this.prefetched.add(url);
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      this.schedule(rest);
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(run, { timeout: 2000 });
    } else {
      setTimeout(run, 200);
    }
  }
}

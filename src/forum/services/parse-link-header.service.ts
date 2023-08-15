import { Injectable } from '@angular/core';
import { PageItem } from '../models/PageResult.class';

@Injectable({
  providedIn: 'root'
})
export class ParseLinkHeaderService {

  constructor() { }
   MAX_HEADER_LENGTH = 2000
   THROW_ON_MAX_HEADER_LENGTH_EXCEEDED = false

  private hasRel (x) {
    return x && x.rel
  }

  private intoRels (acc, x) {
    function splitRel (rel) {
      acc[rel] = Object.assign({}, x, { rel: rel })
    }

    x.rel.split(/\s+/).forEach(splitRel)

    return acc
  }

  private parseLink (link) {
    try {
      const m = link.match(/<?([^>]*)>(.*)/)
      const linkUrl = m[1]
      const parts = m[2].split(';')
      const qry = {}
      // The origin is unused but it's required to parse relative URLs
      const url = new URL(linkUrl, 'https://example.com')
      for (const [key, value] of url.searchParams) {
        qry[key] = value
      }

      parts.shift()

      let info = parts.reduce((acc, part)=>{
        const m = part.match(/\s*(.+)\s*=\s*"?([^"]+)"?/)
        if (m) acc[m[1]] = m[2]
        return acc
      } , {})
      info = Object.assign({}, qry, info)
      info.url = linkUrl

      return info
    } catch (e){

      return null
    }
  }

  private checkHeader (linkHeader, options) {
    if (!linkHeader) return false

    options = options || {}
    const maxHeaderLength = options.maxHeaderLength || this.MAX_HEADER_LENGTH
    const throwOnMaxHeaderLengthExceeded = options.throwOnMaxHeaderLengthExceeded || this.THROW_ON_MAX_HEADER_LENGTH_EXCEEDED

    if (linkHeader.length > maxHeaderLength) {
      if (throwOnMaxHeaderLengthExceeded) {
        throw new Error('Input string too long, it should be under ' + maxHeaderLength + ' characters.')
      } else {
        return false
      }
    }
    return true
  }

  // {first: PageItem, last: PageItem, ...}

  public parseLinkHeader (linkHeader: any, options?: any): {[rel: string]: PageItem}{
    if (!this.checkHeader(linkHeader, options)) return null

    return linkHeader.split(/,\s*</)
      .map(this.parseLink)
      .filter(this.hasRel)
      .reduce(this.intoRels, {})
  }

}

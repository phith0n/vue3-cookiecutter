export class Pager {
  constructor() {
    this.total = 0
    this.totalPage = 1
    this.pageSize = 10
    this.currentPage = 1
    this.data = []
  }

  populate(data) {
    this.total = data['total']
    this.totalPage = data['total_page']
    this.pageSize = data['page_size']
    this.currentPage = data['current_page']
    this.data = data['data']
  }

  statistic() {
    const start = (this.currentPage - 1) * this.pageSize + 1
    const end = Math.min(this.total, (this.currentPage - 1) * this.pageSize + this.pageSize)
    return `Showing ${start} to ${end} of ${this.total} entries`
  }
}

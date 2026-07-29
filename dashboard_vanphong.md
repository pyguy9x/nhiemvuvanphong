# Rule: Dashboard Văn Phòng (Clean UI)

## Mô tả
Template cho giao diện Dashboard quản trị nhiệm vụ văn phòng số, sử dụng thiết kế clean, hiện đại, responsive, và dùng Vanilla JS + HTML + CSS nguyên bản. Không cần dùng framework bên thứ ba (Tailwind/React/Vue...) nhưng vẫn đảm bảo giao diện chuyên nghiệp. Thích hợp sử dụng cho các ứng dụng nội bộ, Google Apps Script.

## Yêu cầu cốt lõi
- **Màu sắc (Variables):** 
  - Nền (`--bg`): `#f3f6fb`
  - Thẻ/Bảng (`--card`): `#ffffff`
  - Chữ chính (`--text`): `#172033`
  - Chữ phụ (`--muted`): `#667085`
  - Primary (Xanh biển): `#3157d5` & `#6e8efb`
  - Secondary/Trạng thái: Xanh lá (`#16a36a`), Hổ phách (`#f59e0b`), Đỏ (`#e5484d`), Lục lam (`#12a8b4`)
  - Viền (`--border`): `#e5eaf2`
  - Bóng (`--shadow`): `0 10px 30px rgba(31, 50, 95, .08)`
- **Bố cục (Layout):**
  - Khung chính (`.shell`): Grid `245px 1fr` cho Sidebar và Main content.
  - Sidebar: Linear gradient nền tối (`#172554` to `#1e3a8a`), chữ trắng, dính (`sticky`). Có phần hiển thị tổng quan động (`.side-note`).
  - Topbar: Header với Title và các Action buttons, flexbox dàn trải.
  - Filters: Grid layout bo tròn góc (`16px`), input/select có viền và hover tinh tế.
  - KPIs: Grid hiển thị các khối số liệu (`.kpi`), sử dụng css custom property `--accent` và pseudo-element (`:after`) làm hình tròn nền nhạt trang trí góc trên phải.
  - Card/Grid: Các khung đồ thị, bảng (`.card`), chứa Header (`.card-head`) và Content.
  - Bảng (`table`): 
    - Có Sticky header để cuộn không mất tiêu đề.
    - Hover highlight trên mỗi row (`tr:hover td`). 
    - Thẻ trạng thái (Badge): Các badge bo tròn (`border-radius: 99px`) với màu nền và màu chữ nổi bật tương ứng với trạng thái (green, blue, red, amber, gray).
  - Responsive: Dùng `@media` queries thu nhỏ các cột, ẩn sidebar trên màn hình hẹp và cuộn dọc tự động. Có CSS riêng cho in ấn `@media print`.

## Code Mẫu HTML/CSS Khung Cơ Bản

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Template</title>
  <style>
    :root {
      --bg: #f3f6fb;
      --card: #ffffff;
      --text: #172033;
      --muted: #667085;
      --primary: #3157d5;
      --primary2: #6e8efb;
      --green: #16a36a;
      --amber: #f59e0b;
      --red: #e5484d;
      --cyan: #12a8b4;
      --border: #e5eaf2;
      --shadow: 0 10px 30px rgba(31, 50, 95, .08);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; font-family: Inter, Segoe UI, sans-serif;
      background: var(--bg); color: var(--text);
    }
    .shell {
      display: grid; grid-template-columns: 245px 1fr; min-height: 100vh;
    }
    .sidebar {
      background: linear-gradient(180deg, #172554, #1e3a8a); color: #fff;
      padding: 24px 18px; position: sticky; top: 0; height: 100vh;
    }
    .main { padding: 26px; min-width: 0; }
    /* Topbar */
    .topbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
    .title h2 { margin: 0 0 6px; font-size: 26px; }
    .title p { margin: 0; color: var(--muted); font-size: 13px; }
    /* KPIs */
    .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 18px; }
    .kpi {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 16px; padding: 17px; box-shadow: var(--shadow);
      position: relative; overflow: hidden;
    }
    .kpi:after {
      content: ""; position: absolute; width: 70px; height: 70px;
      border-radius: 50%; right: -25px; top: -25px;
      background: var(--accent); opacity: .1;
    }
    .kpi-label { font-size: 12px; color: var(--muted); font-weight: 700; text-transform: uppercase; }
    .kpi-value { font-size: 28px; font-weight: 800; margin: 8px 0 3px; }
    /* Card & Table */
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 17px; box-shadow: var(--shadow); margin-bottom: 18px; }
    .table-card { padding: 0; } /* Bỏ padding cho card chứa bảng để bảng viền sát */
    .table-wrap { overflow: auto; max-height: 590px; }
    table { width: 100%; border-collapse: collapse; min-width: 1050px; }
    th { position: sticky; top: 0; z-index: 2; background: #f8faff; color: #475467; padding: 11px 12px; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid var(--border); text-align: left;}
    td { padding: 12px; border-bottom: 1px solid #eef1f6; font-size: 12px; vertical-align: top; }
    tr:hover td { background: #fbfcff; }
    /* Badges */
    .badge { display: inline-flex; padding: 5px 8px; border-radius: 99px; font-size: 11px; font-weight: 700; white-space: nowrap; }
    .badge-green { background: #e8f7f0; color: #087c4d; }
    .badge-blue { background: #eaf0ff; color: #3157d5; }
    .badge-red { background: #feecec; color: #c62f35; }
    .badge-amber { background: #fff4dc; color: #a96900; }
    .badge-gray { background: #eef1f5; color: #596273; }
  </style>
</head>
<body>
  <div class="shell">
    <aside class="sidebar">
      <h2>Văn phòng số</h2>
      <!-- Nav items go here -->
    </aside>
    <main class="main">
      <div class="topbar">
        <div class="title">
          <h2>Dashboard</h2>
          <p>Mô tả dashboard</p>
        </div>
      </div>
      
      <section class="kpis">
        <div class="kpi" style="--accent:#3157d5">
          <div class="kpi-label">Tổng số</div>
          <div class="kpi-value">123</div>
        </div>
        <!-- Thêm các KPI khác -->
      </section>

      <section class="card table-card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Cột 1</th><th>Trạng thái</th></tr>
            </thead>
            <tbody>
              <tr><td>Dữ liệu 1</td><td><span class="badge badge-green">Hoàn thành</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</body>
</html>
```

## Lưu ý về Logic JavaScript
- Hạn chế sử dụng thư viện cồng kềnh, ưu tiên **Vanilla JS**. Render DOM có thể sử dụng mảng `.map().join("")` và gán vào `.innerHTML`.
- Khi lấy dữ liệu từ xa (API/Google Apps Script), luôn **chuẩn hóa (normalize)** đầu vào để tránh lỗi (dùng `String(x ?? "").trim()`).
- Trạng thái lọc và trang (`page`, `applyFilters()`) cần được **duy trì và cập nhật linh hoạt**. Chú ý lỗi khi thực hiện `loadData()` ngầm định kỳ (ví dụ mỗi 60s) tránh ghi đè làm mất mảng dữ liệu đang lọc (`filtered`) của người dùng. Thay vào đó, sau khi fetch xong cần gọi lại `applyFilters()` để lọc dựa trên data mới với điều kiện của người dùng.
- Hiển thị thông báo trạng thái đồng bộ (`sync-status`) rõ ràng góc trên (Đang tải, Hoàn thành, Lỗi kết nối).
- Biểu đồ nên vẽ tự nhiên bằng Canvas API (2D context) đơn giản cho tính gọn nhẹ thay vì kéo Chart.js nếu yêu cầu không quá khắt khe, hoặc sử dụng thanh tiến trình (progress bar) bằng HTML/CSS đơn giản (`div.track > div.fill`).
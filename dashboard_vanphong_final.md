
# Dashboard Design System Enterprise
Version: 2.0
Purpose: Quy chuẩn thống nhất để phát triển mọi Dashboard quản lý công việc.

# A. Vision
Dashboard phải:
- Nhanh
- Chính xác
- Clean UI
- Realtime
- Tái sử dụng
- Không phụ thuộc framework
- Dễ bảo trì

# B. Technology Stack
Frontend:
- HTML5
- CSS3
- Vanilla JavaScript ES6+

Backend:
- Google Apps Script REST API
- Google Sheets

Deployment:
- Static HTML
- GitHub Pages / Hostinger / IIS / Nginx

# C. Folder Convention
/assets
    /css
    /js
    /icons
/components
/services
/utils

index.html

# D. Design Tokens
Background: #F8FAFC
Card: #FFFFFF
Primary: #2563EB
Success: #16A34A
Warning: #F59E0B
Danger: #DC2626

Radius:16px
Shadow:soft
Spacing:8px grid

# E. Components
- KPI Card
- Filter Panel
- Officer Chart
- Monthly Report
- Timeline
- Task Table
- Modal Drill-down
- Toast
- Loading
- Empty State

Mỗi component:
- Responsive
- Keyboard accessible
- Reusable

# F. UX Rules
- Tối đa 3 lần click tới dữ liệu.
- Drill-down mọi số liệu.
- Giữ filter khi refresh.
- Không animation >150ms.
- Khoảng trắng rộng, dễ đọc.

# G. Data Rules
- dd/MM/yyyy
- Cache API
- Parse ngày một lần
- Không hiển thị tháng tương lai
- Ignore dòng rỗng

# H. Performance Rules
- requestAnimationFrame
- debounce
- throttle
- DOM reuse
- Virtual render nếu >5000 dòng
- Không query DOM lặp
- Memoization

# I. Coding Standard
- render*
- load*
- update*
- filter*
- calculate*
- create*

Logic và UI tách riêng.

# J. Dashboard Modules
1 KPI
2 Charts
3 Timeline
4 Monthly Report
5 Task List
6 Drill-down
7 Export
8 Print
9 Settings

# K. Drill-down Standard
Nguồn:
- KPI
- Chart
- Timeline
- Report
- Officer

Popup:
- Search
- Sort
- Copy
- Export
- Print
- Apply Filter

# L. Enterprise Features
- Role Permission
- Audit Log
- Notifications
- Email
- Telegram
- Zalo
- AI Summary
- AI Forecast
- AI Risk Detection

# M. Release Checklist
✓ Desktop
✓ Mobile
✓ KPI
✓ Drill-down
✓ Export
✓ Print
✓ Realtime
✓ Performance
✓ Accessibility

# N. Golden Rules
1. Không hy sinh hiệu năng để lấy hiệu ứng.
2. Giao diện luôn giữ phong cách Clean UI.
3. Mọi dữ liệu đều có khả năng Drill-down.
4. Dashboard phải dùng được ngay trong môi trường hành chính.
5. Mọi dự án mới kế thừa tài liệu này làm chuẩn.

# O. Project Closure — Hệ thống Quản lý Nhiệm vụ Văn phòng

Status: Hoàn thành phiên bản nghiệm thu giao diện và chức năng Dashboard.

## O.1. Phạm vi đã hoàn thành
- Dashboard tổng quan lãnh đạo.
- KPI tổng nhiệm vụ, đã hoàn thành, đang triển khai, quá hạn, sắp đến hạn và nhiệm vụ phát sinh.
- Cảnh báo thời hạn theo nhóm: quá hạn, đến hạn hôm nay, sắp đến hạn.
- Top việc cần ưu tiên được trình bày cân đối, giới hạn chiều cao và hỗ trợ cuộn nội dung.
- Báo cáo theo tháng.
- Báo cáo tuần từ thứ Hai đến Chủ nhật.
- Hiệu suất cán bộ.
- Timeline nhiệm vụ.
- Danh sách nhiệm vụ có tìm kiếm, lọc, sắp xếp và phân trang.
- Drill-down chi tiết từ KPI, biểu đồ, báo cáo tháng, báo cáo tuần, timeline và cán bộ.
- In, xuất PDF và xuất CSV.
- Responsive cho desktop, tablet và mobile.

## O.2. Quy chuẩn Báo cáo tuần
- Tuần được xác định từ thứ Hai đến Chủ nhật.
- Dữ liệu tuần được lấy từ tập dữ liệu sau khi áp dụng toàn bộ bộ lọc hiện tại.
- Các bộ lọc phải được giữ nguyên khi chuyển tuần hoặc mở popup chi tiết.
- Các chỉ số gồm: Tổng nhiệm vụ, Đã hoàn thành, Đang xử lý, Quá hạn, Phát sinh và Tỷ lệ hoàn thành.
- Mọi vùng số liệu phải có khả năng bấm để mở drill-down.
- Popup drill-down chỉ hiển thị nhiệm vụ thuộc đúng tuần đang chọn và đúng điều kiện lọc hiện hành.
- Tỷ lệ hoàn thành mở danh sách nhiệm vụ đã hoàn thành dùng để tính tỷ lệ.
- Cho phép chuyển tuần trước, tuần hiện tại, tuần sau và chọn ngày đại diện cho tuần.

## O.3. Quy chuẩn trình bày cảnh báo
- Khối Cảnh báo thời hạn và Top việc cần ưu tiên phải cân đối về chiều cao và khoảng cách.
- Nội dung nhiệm vụ dài được giới hạn số dòng, có tooltip hoặc tiêu đề đầy đủ khi rê chuột.
- Danh sách dài phải dùng vùng cuộn nội bộ, không làm kéo giãn bất thường toàn bộ trang.
- Các mức thời hạn phải giữ màu sắc nhất quán: đỏ cho quá hạn, cam cho hôm nay, vàng cho sắp đến hạn và xanh cho an toàn.
- Trên mobile, các khối chuyển sang một cột và vẫn giữ khả năng đọc, bấm và cuộn.

## O.4. Nguyên tắc dữ liệu và hiệu năng sau nghiệm thu
- Không tải lại toàn bộ dữ liệu khi chỉ thay đổi bộ lọc phía trình duyệt.
- Parse ngày một lần khi dữ liệu được nạp.
- Cache dữ liệu sau lần tải đầu và chỉ đồng bộ lại khi người dùng yêu cầu hoặc khi hết thời gian cache.
- Chỉ render lại component bị ảnh hưởng.
- Debounce ô tìm kiếm và tránh lặp truy vấn DOM.
- Với dữ liệu lớn, API phải hỗ trợ lọc, phân trang và tổng hợp ở phía máy chủ.
- Không phụ thuộc Google Sheets như một cơ sở dữ liệu giao dịch khi số người dùng, số bản ghi hoặc tần suất cập nhật tăng cao.

## O.5. Mốc chuyển đổi backend khuyến nghị
Tiếp tục dùng Google Sheets khi:
- Dữ liệu nhỏ hoặc trung bình.
- Số người dùng đồng thời thấp.
- Chủ yếu đọc dữ liệu và cập nhật không thường xuyên.
- Cần cán bộ dễ dàng kiểm tra hoặc chỉnh dữ liệu trực tiếp trên bảng tính.

Cân nhắc chuyển sang cơ sở dữ liệu quan hệ như Supabase/PostgreSQL khi:
- Dashboard thường xuyên tải chậm dù đã cache và tối ưu frontend.
- Số bản ghi tăng lên hàng nghìn đến hàng chục nghìn và tiếp tục tăng.
- Có nhiều người dùng đồng thời.
- Cần phân quyền theo người dùng hoặc đơn vị.
- Cần lịch sử thay đổi, audit log, thông báo realtime hoặc nhiều bảng dữ liệu liên kết.
- Cần lọc, phân trang, thống kê và tổng hợp trực tiếp tại server.

## O.6. Kiến trúc mục tiêu khi nâng cấp
Frontend HTML/CSS/Vanilla JavaScript
→ Service layer/API client
→ Supabase REST/RPC
→ PostgreSQL

Các bảng nền tảng đề xuất:
- users
- officers
- tasks
- task_assignments
- task_updates
- departments
- audit_logs

Yêu cầu bắt buộc:
- Bật Row Level Security.
- Không đưa service role key vào frontend.
- Dùng khóa ngoại và index cho các trường lọc thường xuyên.
- Có trường created_at, updated_at và created_by.
- Giữ lớp service độc lập để có thể thay backend mà không viết lại toàn bộ UI.

## O.7. Kết luận nghiệm thu
Phiên bản hiện tại được chốt là bản hoàn thành chức năng Dashboard phía giao diện. Các thay đổi tiếp theo được xem là giai đoạn nâng cấp backend, bảo mật, phân quyền và tối ưu quy mô dữ liệu.

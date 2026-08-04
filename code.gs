// ==========================================
// Code appscipt của sheet, chạy xé gió luôn!
// CẤU HÌNH THÔNG TIN SUPABASE CỦA BẠN
// ==========================================
//🔑 ĐIỀN THÔNG SỐ CỦA BẠN (Lấy từ Supabase -> Project Settings -> API)
const SUPABASE_URL = "https://zipvocbtmilyeuhqqrur.supabase.co"  //URL Supabase của bạn
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppcHZvY2J0bWlseWV1aHFxcnVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNTY0NjgsImV4cCI6MjA5OTgzMjQ2OH0.-LUZdiukACGQS7pR71HNFmxmDkDGNi2x3Rs6KM9nN5s"        //Key của bạn

// 1. TỰ ĐỘNG ĐỒNG BỘ KHI CÓ SỰ CHỈNH SỬA ĐƠN LẺ
function onEditTrigger(e) {
  if (!e || !e.range) return;
  
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  
  const excludedSheets = new Set(["tong hop", "huong dan su dung", "danh muc"]);
  if (excludedSheets.has(normalizeText(sheetName))) return;

  const row = e.range.getRow();
  
  // Không đồng bộ các dòng tiêu đề (ví dụ 15 dòng đầu)
  if (row <= 1) return;

  // Gọi hàm đồng bộ toàn bộ sheet chứa dòng vừa sửa (đảm bảo tính chính xác)
  syncSingleSheetToSupabase(sheet);
}

// 2. HÀM ĐỒNG BỘ TOÀN BỘ DỮ LIỆU TỪ SHEET SANG SUPABASE
function syncAllSheetsToSupabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const excludedSheets = new Set(["tong hop", "huong dan su dung", "danh muc"]);
  
  let allTasks = [];

  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    if (excludedSheets.has(normalizeText(sheetName))) return;

    const tasks = extractTasksFromSheet(sheet);
    allTasks = allTasks.concat(tasks);
  });

  if (allTasks.length > 0) {
    sendToSupabase(allTasks);
  }
}

// 3. HÀM ĐỒNG BỘ 1 SHEET CỤ THỂ
function syncSingleSheetToSupabase(sheet) {
  const tasks = extractTasksFromSheet(sheet);
  if (tasks.length > 0) {
    sendToSupabase(tasks);
  }
}

// 4. BÓC TÁCH DỮ LIỆU TỪ SHEET
function extractTasksFromSheet(sheet) {
  const sheetName = sheet.getName();
  const range = sheet.getDataRange();
  const rawValues = range.getValues();
  const rowCount = rawValues.length;
  
  if (rowCount < 2) return [];

  let headerRowIndex = -1;
  const maxSearchRow = Math.min(rowCount, 15);

  for (let i = 0; i < maxSearchRow; i++) {
    const rowText = normalizeText(rawValues[i].join(" "));
    if (
      rowText.includes("nhiem vu") &&
      (rowText.includes("trang thai") || rowText.includes("tien do"))
    ) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) return [];

  const headers = rawValues[headerRowIndex].map(normalizeText);

  function findColumn(keywords) {
    return headers.findIndex(header =>
      keywords.some(keyword => header.includes(keyword))
    );
  }

  const sttCol = findColumn(["stt", "so thu tu"]);
  const taskCol = findColumn(["nhiem vu cu the", "noi dung nhiem vu", "nhiem vu"]);
  const emergentCol = findColumn(["nhiem vu phat sinh", "phat sinh", "nhiem vu dot xuat"]);
  const roleCol = findColumn(["vai tro", "chu tri hoac phoi hop", "chu tri hoac php", "chu tri phoi hop"]);
  const dueCol = findColumn(["ngay yeu cau hoan thanh", "han hoan thanh", "thoi han", "han xu ly"]);
  const completedCol = findColumn(["ngay hoan thanh", "thoi gian hoan thanh"]);
  const productCol = findColumn(["san pham cu the", "san pham", "ket qua dau ra"]);
  const statusCol = findColumn(["trang thai", "tien do", "ket qua thuc hien"]);
  const positionCol = findColumn(["chuc vu", "vi tri"]);

  if (taskCol === -1) return [];

  const titleInfo = getOwnerInfo(rawValues[0] ? rawValues[0][0] : "", sheetName);
  const tasks = [];

  for (let rowIndex = headerRowIndex + 1; rowIndex < rowCount; rowIndex++) {
    const rawRow = rawValues[rowIndex];
    const taskRaw = rawRow[taskCol];

    if (taskRaw === null || taskRaw === undefined || taskRaw === "") continue;
    const task = String(taskRaw).trim();
    if (!task) continue;

    const emergentRaw = emergentCol >= 0 ? rawRow[emergentCol] : false;
    const emergentDisplay = emergentCol >= 0 ? normalizeText(emergentRaw) : "";

    const isEmergent =
      emergentRaw === true ||
      emergentRaw === 1 ||
      String(emergentRaw).toLowerCase() === "true" ||
      emergentDisplay === "1" ||
      emergentDisplay === "co" ||
      emergentDisplay === "x" ||
      emergentDisplay === "yes" ||
      emergentDisplay.includes("phat sinh") ||
      emergentDisplay.includes("dot xuat");

    tasks.push({
      sheet_name: sheetName,
      row_number: rowIndex + 1,
      owner: titleInfo.owner,
      position: positionCol >= 0 ? String(rawRow[positionCol] || "").trim() : titleInfo.position,
      stt: sttCol >= 0 ? String(rawRow[sttCol] || "").replace(/\.0$/, "").trim() : String(tasks.length + 1),
      task: task,
      role: roleCol >= 0 ? standardizeRole(rawRow[roleCol]) : "",
      due: dueCol >= 0 ? convertDate(rawRow[dueCol]) : null,
      completed: completedCol >= 0 ? convertDate(rawRow[completedCol]) : null,
      product: productCol >= 0 ? String(rawRow[productCol] || "").trim() : "",
      status: statusCol >= 0 ? standardizeStatus(rawRow[statusCol]) : "Chưa cập nhật",
      emergent: isEmergent,
      updated_at: new Date().toISOString()
    });
  }

  return tasks;
}

// 5. GỬI DỮ LIỆU ĐẾN SUPABASE (SỬ DỤNG UPSERT)
function sendToSupabase(payload) {
  // ĐÃ ĐỔI TÊN BẢNG THÀNH: department_tasks
  const url = `${SUPABASE_URL}/rest/v1/department_tasks?on_conflict=sheet_name,row_number`;
  
  const options = {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates" // Tự động ghi đè nếu trùng dòng
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  Logger.log("Supabase Response: " + response.getContentText());
}

// --- HÀM BỎ TRỢ ---
function normalizeText(value) {
  return String(value || "").toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/\s+/g, " ");
}

function standardizeStatus(value) {
  const original = String(value || "").trim();
  const text = normalizeText(original);
  if (!text) return "Chưa cập nhật";
  if (text.includes("qua han")) return "Quá hạn";
  if (text.includes("truoc han") || text.includes("som")) return "Trước hạn";
  if (text.includes("dung han")) return "Đúng hạn";
  if (text.includes("dang trien khai") || text.includes("dang thuc hien") || text.includes("dang xu ly")) return "Đang triển khai";
  if (text.includes("hoan thanh")) return "Đã hoàn thành";
  return original;
}

function standardizeRole(value) {
  const original = String(value || "").trim();
  const text = normalizeText(original);
  if (!text) return "";
  if (text === "ct" || text.includes("chu tri")) return "Chủ trì";
  if (text === "ph" || text.includes("phoi hop")) return "Phối hợp";
  return original;
}

function convertDate(rawValue) {
  if (!rawValue) return null;
  if (rawValue instanceof Date && !isNaN(rawValue.getTime())) {
    return Utilities.formatDate(rawValue, Session.getScriptTimeZone(), "yyyy-MM-dd");
  }
  const text = String(rawValue).trim();
  if (!text) return null;
  const match = text.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  return null;
}

function getOwnerInfo(title, sheetName) {
  const cleanTitle = String(title || "").replace(/THEO DÕI NHIỆM VỤ/gi, "").replace(/[–—-]/g, " ").replace(/\s+/g, " ").trim();
  const match = cleanTitle.match(/^(.+?)\s*\((.+?)\)\s*$/);
  if (match) return { owner: match[1].trim() || sheetName, position: match[2].trim() };
  return { owner: cleanTitle || sheetName, position: "" };
}

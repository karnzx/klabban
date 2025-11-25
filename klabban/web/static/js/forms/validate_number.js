function validateNumberField(field_id) {
  // 1. ค้นหา element ด้วย ID ที่รับเข้ามา
  const phoneInput = document.getElementById(field_id);

  // 2. ตรวจสอบว่าเจอ element หรือไม่ (กัน error)
  if (phoneInput) {
    
    // 3. เพิ่ม Event Listener ประเภท 'input'
    // Event 'input' จะทำงานทุกครั้งที่ค่าในช่องเปลี่ยนแปลง (พิมพ์, วาง, ลบ)
    phoneInput.addEventListener('input', function() {
      
      // 4. ใช้ Regular Expression (Regex) เพื่อลบทุกอย่างที่ไม่ใช่ตัวเลข
      // \D (ตัว D พิมพ์ใหญ่) หมายถึง "ทุกตัวอักษรที่ไม่ใช่ตัวเลข (non-digit)"
      // /g (global) หมายถึง "ให้ค้นหาและแทนที่ทุกตัวที่เจอ"
      const numericValue = phoneInput.value.replace(/\D/g, '');
      
      // 5. อัปเดตค่าในช่อง input ให้เป็นค่าที่กรองแล้ว
      phoneInput.value = numericValue;
    });

  } else {
    // แจ้งเตือนใน console หากหา ID ไม่เจอ
    console.warn(`[validateNumber] ไม่พบ Element ที่มี ID: ${field_id}`);
  }
}

function validateMultipleNumber(field_id) {
    const phoneInput = document.getElementById(field_id);

  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      
      // ⬇️ จุดที่แก้ไขอยู่บรรทัดนี้ครับ
      // เราเปลี่ยน Regex เป็น [^0-9,] เพื่ออนุญาตเฉพาะตัวเลขและคอมม่า
      const allowedValue = phoneInput.value.replace(/[^0-9,]/g, '');
      
      // อัปเดตค่าในช่อง input
      phoneInput.value = allowedValue;
    });

  } else {
    console.warn(`[validatePhoneNumber] ไม่พบ Element ที่มี ID: ${field_id}`);
  }
}
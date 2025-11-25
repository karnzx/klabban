// Global function สำหรับ initialize date field หนึ่งตัว
function initDateField(wrapper) {
    if (wrapper.dataset.initialized === 'true') return; // ป้องกัน init ซ้ำ

    const input = wrapper.querySelector('.js-date-input'); // เก็บ ค.ศ. (yyyy-mm-dd)
    const button = wrapper.querySelector('.js-date-button');
    const display = wrapper.querySelector('.js-date-display');
    const clearButton = wrapper.querySelector('.js-date-clear'); // ปุ่ม Clear
    const calendarIcon = wrapper.querySelector('.calendar-icon');
    const popover = wrapper.querySelector('.js-date-popover');
    const monthSelect = wrapper.querySelector('.js-month-select');
    const yearSelect = wrapper.querySelector('.js-year-select'); // เก็บ พ.ศ.
    const calendarContainer = wrapper.querySelector('.js-calendar-container');


    const THAI_YEAR_OFFSET = 543;

    // --- Helper Function: อัปเดตสถานะปุ่ม Clear ---
    const updateClearButton = () => {
        if (input.value) {
            clearButton.classList.remove('hidden');
            calendarIcon.style.display = 'none';
        } else {
            clearButton.classList.add('hidden');
            calendarIcon.style.display = 'block';
        }
    };

    // 1. ฟังก์ชัน Render Calendar
    const renderCalendar = (dateStr) => {
        // dateStr ที่รับมาคือ ค.ศ. (yyyy-mm-dd)
        calendarContainer.innerHTML = `
            <calendar-date class="cally" value="${dateStr}">
                <i aria-label="Previous" class="ph ph-caret-left" slot="previous"></i>
                <i aria-label="Next" class="ph ph-caret-right" slot="next"></i>
                <calendar-month></calendar-month>
            </calendar-date>
        `;
        const newCalendar = calendarContainer.firstElementChild;

        newCalendar.addEventListener('change', (e) => {
            const selectedDate = new Date(e.target.value); // ได้ค่าวันที่ ค.ศ.
            input.value = e.target.value; // เก็บค่า ค.ศ. ลง hidden input

            // *** แก้ไข: แปลง ค.ศ. เป็น พ.ศ. เพื่อแสดงผล ***
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const thYear = selectedDate.getFullYear() + THAI_YEAR_OFFSET;
            
            display.innerText = `${day}/${month}/${thYear}`; // แสดง 21/11/2568
            
            popover.classList.add('hidden');
            updateClearButton();
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    };

    // 2. ฟังก์ชันอัปเดตมุมมองจาก Dropdown
    const updateCalendarView = () => {
        const thYear = parseInt(yearSelect.value); // รับค่า พ.ศ. จาก Dropdown
        const month = parseInt(monthSelect.value);

        // *** แก้ไข: แปลง พ.ศ. กลับเป็น ค.ศ. เพื่อส่งให้ Calendar วาด ***
        const gYear = thYear - THAI_YEAR_OFFSET; 

        const newDate = new Date(gYear, month, 1);
        const yearStr = newDate.getFullYear();
        const monthStr = String(newDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(newDate.getDate()).padStart(2, '0');
        
        renderCalendar(`${yearStr}-${monthStr}-${dayStr}`);
    };

    // --- 3. Event Listeners ---

    // ปุ่มเปิด/ปิด Popover
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        // ปิด popover อื่นๆ ก่อน
        document.querySelectorAll('.js-date-popover').forEach(p => p !== popover && p.classList.add('hidden'));
        popover.classList.toggle('hidden');
    });

    // ปุ่ม Clear (ล้างข้อมูล)
    clearButton.addEventListener('click', (e) => {
        e.stopPropagation(); // ป้องกันไม่ให้เปิด Popover
        
        input.value = ''; // ล้างค่า
        display.innerText = display.dataset.placeholder; // คืนค่า placeholder
        
        updateClearButton(); // ซ่อนปุ่มตัวเอง
        input.dispatchEvent(new Event('change', { bubbles: true })); // trigger change event
    });

    // คลิกที่อื่นเพื่อปิด Popover
    document.addEventListener('click', (e) => {
        if (!wrapper.contains(e.target)) {
            popover.classList.add('hidden');
        }
    });

    // เปลี่ยนเดือน/ปี
    monthSelect.addEventListener('change', updateCalendarView);
    yearSelect.addEventListener('change', updateCalendarView);

    if (input.value) {
        const initialDate = new Date(input.value);
        // *** แก้ไข: ตั้งค่า Dropdown ปี เป็น พ.ศ. (ค.ศ. + 543) ***
        yearSelect.value = initialDate.getFullYear() + THAI_YEAR_OFFSET;
        monthSelect.value = initialDate.getMonth();
        renderCalendar(input.value);
    } else {
        // ถ้าไม่มีค่า เอาวันปัจจุบัน
        const now = new Date();
        // *** แก้ไข: ตั้งค่า Dropdown ปี เป็น พ.ศ. ปัจจุบัน ***
        yearSelect.value = now.getFullYear() + THAI_YEAR_OFFSET;
        monthSelect.value = now.getMonth();
        renderCalendar(now.toISOString().split('T')[0]);
    }
    updateClearButton(); // เช็คสถานะปุ่ม Clear ครั้งแรก
    wrapper.dataset.initialized = 'true'; // Mark as initialized
}

// ฟังก์ชันสำหรับ init ทั้งหมดในหน้า (เรียกตอนโหลดครั้งแรก)
function initAllDateFields() {
    document.querySelectorAll('.js-date-field-wrapper').forEach(initDateField);
}
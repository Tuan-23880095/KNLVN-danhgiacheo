import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader2, ChevronDown, ChevronUp, Info } from 'lucide-react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzg6-KGrM7cJLbxM4VhaKuUDBlcALrzP1ww61JpMwExNSln9uw_JMfuPn3rwE6D1MfOIQ/exec';

const LOP_HOC = [
  { id: 'T6', name: 'Sáng Thứ 6 (T6-0xx)', maxGroup: 9 },
  { id: 'T7', name: 'Sáng Thứ 7 (T7-0x)', maxGroup: 10 }
];

const RUBRIC_DATA = [
  {
    id: 'tc1', title: '1. Tham dự & Phối hợp', weight: 0.2, weightText: '20%',
    levels: [
      { value: 100, label: 'Tốt - Xuất sắc (80-100%)', desc: 'Vắng 0 buổi họp nhóm; luôn đi đúng giờ. Đóng góp ≥ 3-4 ý kiến/buổi. Tuân thủ 100% nội quy nhóm. Luôn chủ động hỗ trợ và đọc bài của thành viên khác.' },
      { value: 80, label: 'Khá (60-<80%)', desc: 'Vắng 1 buổi (có phép); trễ ít. Đóng góp 2 ý kiến/buổi. Vi phạm nội quy 1 lần. Có hỗ trợ thành viên khác khi được yêu cầu.' },
      { value: 60, label: 'Trung bình (40-<60%)', desc: 'Vắng 2 buổi họp nhóm / hay đi trễ. Đóng góp 1 ý kiến/buổi. Vi phạm nội quy 2-3 lần. Ít khi đọc bài hay hỗ trợ đồng đội.' },
      { value: 40, label: 'Kém (<40%)', desc: 'Vắng ≥ 3 buổi họp. Không đóng góp bất kỳ ý kiến nào. Vi phạm nội quy liên tục. Không hợp tác, gây xích mích chia rẽ nhóm.' }
    ]
  },
  {
    id: 'tc2', title: '2. Quản lý công việc', weight: 0.2, weightText: '20%',
    levels: [
      { value: 100, label: 'Tốt - Xuất sắc (80-100%)', desc: 'Không bao giờ trễ deadline. Hoàn thành 100% khối lượng nội dung được giao. Chủ động cập nhật tiến độ công việc liên tục.' },
      { value: 80, label: 'Khá (60-<80%)', desc: 'Trễ deadline 1 lần (trong mức chấp nhận). Hoàn thành 80% khối lượng nội dung. Có cập nhật tiến độ nhưng đôi khi cần nhắc nhở.' },
      { value: 60, label: 'Trung bình (40-<60%)', desc: 'Trễ deadline 2 lần. Hoàn thành 60% khối lượng nội dung. Phải để nhóm trưởng hối thúc, nhắc nhở nhiều lần.' },
      { value: 40, label: 'Kém (<40%)', desc: 'Trễ deadline ≥ 3 lần. Hoàn thành <50% nội dung (hoặc bỏ việc). Thái độ làm việc đối phó, không báo cáo tiến độ.' }
    ]
  },
  {
    id: 'tc3', title: '3. Giao tiếp (Nghe, Viết, Trao đổi)', weight: 0.2, weightText: '20%',
    levels: [
      { value: 100, label: 'Tốt - Xuất sắc (80-100%)', desc: 'Trả lời thắc mắc/tin nhắn nhóm nhanh chóng. Lắng nghe tích cực, không ngắt lời người khác. Thái độ nhiệt tình, vui vẻ, tôn trọng ý kiến đồng đội.' },
      { value: 80, label: 'Khá (60-<80%)', desc: 'Trả lời tin nhắn tương đối đầy đủ. Có lắng nghe nhưng đôi khi phản hồi chưa sâu. Thái độ hòa đồng, lịch sự.' },
      { value: 60, label: 'Trung bình (40-<60%)', desc: 'Trả lời tin nhắn chậm chạp, "seen" không rep. Ít tham gia trao đổi, giao tiếp chưa rõ ràng gây hiểu lầm. Thái độ thụ động.' },
      { value: 40, label: 'Kém (<40%)', desc: 'Mất kết nối, không trả lời tin nhắn. Bác bỏ ý kiến người khác một cách vô lý. Có lời nói khiêu khích, chỉ trích, nói tục làm ảnh hưởng tiến độ.' }
    ]
  },
  {
    id: 'tc4', title: '4. Giải quyết vấn đề', weight: 0.15, weightText: '15%',
    levels: [
      { value: 100, label: 'Tốt - Xuất sắc (80-100%)', desc: 'Chủ động phát hiện nguyên nhân vấn đề. Đề xuất ≥ 2 giải pháp khả thi, sáng tạo. Phản biện nội dung của người khác mang tính logic, xây dựng.' },
      { value: 80, label: 'Khá (60-<80%)', desc: 'Nhận diện được vấn đề khi nhóm thảo luận. Đưa ra giải pháp nhưng chưa thực sự tối ưu. Có tranh luận, phản biện nhưng đôi khi chưa đủ sâu sắc.' },
      { value: 60, label: 'Trung bình (40-<60%)', desc: 'Ít tham gia nhận diện vấn đề. Đưa ra giải pháp rất hạn chế. Ít phản biện, thường xuyên hùa theo số đông.' },
      { value: 40, label: 'Kém (<40%)', desc: 'Không nhận diện được vấn đề. Không đề xuất giải pháp. Né tránh, đùn đẩy khi có sự cố. Không có tư duy phản biện.' }
    ]
  },
  {
    id: 'tc5', title: '5. Nội dung công việc được phân công', weight: 0.25, weightText: '25%',
    levels: [
      { value: 100, label: 'Tốt - Xuất sắc (80-100%)', desc: 'Nội dung chính xác >90%. Trình bày đúng định dạng, mạch lạc, ≤ 2 lỗi chính tả. Có trích dẫn nguồn tài liệu đáng tin cậy. Có dẫn chứng, ví dụ minh họa rõ ràng.' },
      { value: 80, label: 'Khá (60-<80%)', desc: 'Nội dung chính xác 75% - 90%. Trình bày đúng định dạng, mắc 3-4 lỗi chính tả. Có trích dẫn nguồn nhưng chưa phong phú. Lập luận tương đối tốt.' },
      { value: 60, label: 'Trung bình (40-<60%)', desc: 'Nội dung chính xác 50% - 75%. Sai định dạng, mắc 5-6 lỗi chính tả. Nội dung còn rời rạc, lập luận yếu. Thiếu trích dẫn nguồn uy tín.' },
      { value: 40, label: 'Kém (<40%)', desc: 'Nội dung chính xác <50% hoặc sai lệch hoàn toàn đề tài. Sao chép (đạo văn), >7 lỗi chính tả. Không có hình ảnh, không có nguồn trích dẫn. Không thể sử dụng được bài làm.' }
    ]
  }
];

export default function App() {
  const [formData, setFormData] = useState({
    lop: '',
    nhom: '',
    hoTen: '',
    hoTenDuocDanhGia: '',
    diem: { tc1: '', tc2: '', tc3: '', tc4: '', tc5: '' },
    nhanXet: ''
  });

  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRubric, setShowRubric] = useState(false);

  const currentClass = LOP_HOC.find(c => c.id === formData.lop);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScoreChange = (tcId, value) => {
    setFormData(prev => ({
      ...prev,
      diem: { ...prev.diem, [tcId]: value }
    }));
  };

  // Tính tổng điểm phần trăm dựa trên trọng số
  const calculateTotal = () => {
    const d = formData.diem;
    if (!d.tc1 || !d.tc2 || !d.tc3 || !d.tc4 || !d.tc5) return 0;
    
    const total = 
      (Number(d.tc1) * 0.20) + 
      (Number(d.tc2) * 0.20) + 
      (Number(d.tc3) * 0.20) + 
      (Number(d.tc4) * 0.15) + 
      (Number(d.tc5) * 0.25);
      
    return Math.round(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.lop || !formData.nhom || !formData.hoTen || !formData.hoTenDuocDanhGia) {
      setStatus('error');
      setErrorMessage('Vui lòng điền đầy đủ thông tin cá nhân và người được đánh giá.');
      return;
    }

    if (!formData.diem.tc1 || !formData.diem.tc2 || !formData.diem.tc3 || !formData.diem.tc4 || !formData.diem.tc5) {
      setStatus('error');
      setErrorMessage('Vui lòng đánh giá đầy đủ 5 tiêu chí.');
      return;
    }

    if (formData.hoTen.trim().toLowerCase() === formData.hoTenDuocDanhGia.trim().toLowerCase()) {
      setStatus('error');
      setErrorMessage('Bạn không thể tự đánh giá chính mình trong biểu mẫu này.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const tongDiem = calculateTotal();

    const submitData = new FormData();
    submitData.append('Lop', formData.lop === 'T6' ? 'Sáng Thứ 6' : 'Sáng Thứ 7');
    submitData.append('Nhom', `Nhóm ${formData.nhom}`);
    submitData.append('Nguoi_Danh_Gia', formData.hoTen);
    submitData.append('Nguoi_Duoc_Danh_Gia', formData.hoTenDuocDanhGia);
    submitData.append('Tham_Du_20', formData.diem.tc1);
    submitData.append('Quan_Ly_20', formData.diem.tc2);
    submitData.append('Giao_Tiep_20', formData.diem.tc3);
    submitData.append('Giai_Quyet_VD_15', formData.diem.tc4);
    submitData.append('Noi_Dung_25', formData.diem.tc5);
    submitData.append('Tong_Diem_Phan_Tram', tongDiem + '%');
    submitData.append('Nhan_Xet', formData.nhanXet || 'Không có');
    submitData.append('SheetName', 'DanhGiaCheoKNLVN'); // Tên sheet Google

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: submitData,
        mode: 'no-cors'
      });
      
      setStatus('success');
      // Chỉ reset người được đánh giá và điểm để tiện nhập người tiếp theo
      setFormData(prev => ({
        ...prev,
        hoTenDuocDanhGia: '',
        diem: { tc1: '', tc2: '', tc3: '', tc4: '', tc5: '' },
        nhanXet: ''
      }));
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setStatus('error');
      setErrorMessage('Lỗi kết nối máy chủ. Vui lòng kiểm tra lại mạng và thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-indigo-600 px-6 py-8 sm:p-10 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
              Đánh Giá Chéo Thành Viên
            </h1>
            <p className="mt-2 text-indigo-100 text-sm sm:text-base">
              Kỹ năng làm việc nhóm - Dành cho đánh giá nội bộ trong nhóm
            </p>
          </div>
        </div>

        {/* Hướng dẫn & Rubric Toggle */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <button 
            onClick={() => setShowRubric(!showRubric)}
            className="w-full flex justify-between items-center px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors focus:outline-none"
          >
            <div className="flex items-center text-indigo-700 font-semibold text-lg">
              <Info className="w-5 h-5 mr-2" />
              Hướng dẫn & Bảng Rubric Tiêu Chí
            </div>
            {showRubric ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
          </button>
          
          {showRubric && (
            <div className="px-6 py-6 border-t border-gray-200">
              <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-sm">
                <h4 className="font-bold mb-2 text-amber-900">Gợi ý vận hành cho Nhóm trưởng (nhóm 10-11 người):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Cách tính điểm tổng:</strong> Điểm tổng kết của một cá nhân sẽ là mức trung bình cộng có trọng số của các tiêu chí. Hệ thống bên dưới sẽ tự động tính toán.</li>
                  <li><strong>Quy tắc "Ăn theo" (Hitchhikers):</strong> Nếu một cá nhân bị đánh giá tổng dưới 50% mức độ đóng góp, điểm bài tập nhóm của cá nhân đó sẽ bị trừ tỷ lệ thuận (chỉ nhận được một phần điểm) hoặc báo cáo Giảng viên xử lý.</li>
                </ul>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-bold text-gray-700 w-1/5 border-r">TIÊU CHÍ (Trọng số)</th>
                      <th className="px-4 py-3 text-left font-bold text-green-700 w-1/5 border-r">TỐT - XUẤT SẮC<br/>(100% - 80%)</th>
                      <th className="px-4 py-3 text-left font-bold text-blue-700 w-1/5 border-r">KHÁ<br/>(&lt;80% - 60%)</th>
                      <th className="px-4 py-3 text-left font-bold text-yellow-700 w-1/5 border-r">TRUNG BÌNH<br/>(&lt;60% - 40%)</th>
                      <th className="px-4 py-3 text-left font-bold text-red-700 w-1/5">KÉM<br/>(Dưới 40%)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {RUBRIC_DATA.map((tc) => (
                      <tr key={tc.id}>
                        <td className="px-4 py-3 font-semibold text-gray-900 border-r">{tc.title}<br/><span className="text-indigo-600">({tc.weightText})</span></td>
                        {tc.levels.map((level, i) => (
                          <td key={i} className="px-4 py-3 text-gray-600 border-r align-top">{level.desc}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden px-6 py-8 sm:p-10">
          
          {/* Alerts */}
          {status === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start shadow-sm">
              <CheckCircle className="text-green-500 w-6 h-6 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-green-800 font-bold text-lg">Gửi đánh giá thành công!</h3>
                <p className="text-green-700 mt-1">Bạn có thể tiếp tục đánh giá thành viên khác (Thông tin lớp/nhóm của bạn đã được giữ lại).</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start shadow-sm">
              <AlertCircle className="text-red-500 w-6 h-6 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Section 1: Thông tin người đánh giá */}
            <div className="space-y-6">
              <div className="flex items-center border-b pb-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</span>
                <h2 className="text-xl font-semibold text-gray-800">Thông tin của bạn</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lớp <span className="text-red-500">*</span></label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                    value={formData.lop}
                    onChange={(e) => {
                      handleInputChange('lop', e.target.value);
                      handleInputChange('nhom', '');
                    }}
                  >
                    <option value="">-- Chọn --</option>
                    {LOP_HOC.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm <span className="text-red-500">*</span></label>
                  <select
                    className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 disabled:opacity-50"
                    value={formData.nhom}
                    onChange={(e) => handleInputChange('nhom', e.target.value)}
                    disabled={!formData.lop}
                  >
                    <option value="">-- Chọn --</option>
                    {currentClass && Array.from({ length: currentClass.maxGroup }, (_, i) => (
                      <option key={i + 1} value={i + 1}>Nhóm {i + 1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên của bạn <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    className="w-full rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.hoTen}
                    onChange={(e) => handleInputChange('hoTen', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Đánh giá thành viên */}
            <div className="space-y-6">
              <div className="flex items-center border-b pb-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</span>
                <h2 className="text-xl font-semibold text-gray-800">Đánh giá đồng đội</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ tên thành viên cần đánh giá <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Nhập tên thành viên trong cùng nhóm..."
                  className="w-full sm:w-1/2 rounded-md border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.hoTenDuocDanhGia}
                  onChange={(e) => handleInputChange('hoTenDuocDanhGia', e.target.value)}
                />
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-100 border-b border-gray-200">
                  <p className="text-sm text-gray-600 font-medium">Chọn mức độ phù hợp cho từng tiêu chí bên dưới:</p>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {RUBRIC_DATA.map((tc) => (
                    <div key={tc.id} className="p-5 hover:bg-white transition-colors">
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-800 text-lg">{tc.title} <span className="text-indigo-600 font-normal">({tc.weightText})</span></h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {tc.levels.map((level, idx) => (
                          <label 
                            key={idx} 
                            className={`relative flex flex-col p-4 cursor-pointer rounded-lg border-2 transition-all duration-200
                              ${formData.diem[tc.id] == level.value 
                                ? 'border-indigo-600 bg-indigo-50' 
                                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                          >
                            <input 
                              type="radio" 
                              name={`score_${tc.id}`} 
                              value={level.value}
                              checked={formData.diem[tc.id] == level.value}
                              onChange={(e) => handleScoreChange(tc.id, e.target.value)}
                              className="sr-only"
                            />
                            <span className={`font-bold mb-1 ${
                              idx === 0 ? 'text-green-700' : 
                              idx === 1 ? 'text-blue-700' : 
                              idx === 2 ? 'text-yellow-700' : 'text-red-700'
                            }`}>
                              {level.label}
                            </span>
                            <span className="text-xs text-gray-600 leading-relaxed">{level.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-6 bg-indigo-50 border-t border-indigo-100 flex flex-col sm:flex-row justify-between items-center">
                  <span className="font-semibold text-gray-800 mb-2 sm:mb-0">Tổng điểm đóng góp quy đổi:</span>
                  <div className="flex items-center">
                    <span className="font-black text-3xl text-indigo-700">{calculateTotal()}%</span>
                    {calculateTotal() < 50 && calculateTotal() > 0 && (
                      <span className="ml-3 px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">Mức cảnh báo</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Nhận xét */}
            <div className="space-y-4">
              <div className="flex items-center border-b pb-2">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</span>
                <h2 className="text-xl font-semibold text-gray-800">Nhận xét thêm</h2>
              </div>
              <div>
                <textarea
                  rows={3}
                  className="w-full rounded-md border border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
                  placeholder="Ghi chú thêm về thái độ, đóng góp hoặc đề xuất cho thành viên này (không bắt buộc)..."
                  value={formData.nhanXet}
                  onChange={(e) => handleInputChange('nhanXet', e.target.value)}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-gray-200 flex justify-end">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Send className="-ml-1 mr-2 h-5 w-5" />
                    Hoàn tất Đánh Giá
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

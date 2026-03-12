import React, { useState, useMemo } from 'react';

// Link Google Apps Script bạn đã cung cấp
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBPRlkjpMLDctdm2Uk7aYex_P6Cx0uhIdUmwOcYEm9C7JDe5OH92FiWEn6Nz1HNenY-A/exec';

// Danh sách 179 sinh viên
const rawCSV = `1,25110086,LÊ LONG NHẬT,2511008681@student.hcmus.edu.vn,25KDL,Nhóm T6-03
2,25110090,VŨ PHAN QUỲNH NHI,2511009085@student.hcmus.edu.vn,25KDL,Nhóm T6-03
3,25110094,NGUYỄN NHÃ PHONG,2511009418@student.hcmus.edu.vn,25KDL,Nhóm T6-03
4,25110100,TRẦN LÊ MINH PHÚC,2511010016@student.hcmus.edu.vn,25KDL,Nhóm T6-03
5,25110104,NGUYỄN DƯƠNG NGỌC PHƯƠNG,2511010493@student.hcmus.edu.vn,25KDL,Nhóm T6-05
6,25110109,TRẦN TÚ QUYÊN,2511010916@student.hcmus.edu.vn,25KDL,Nhóm T6-05
7,25110110,HUỲNH PHAN QUỲNH,2511011084@student.hcmus.edu.vn,25KDL,Nhóm T6-03
8,25110113,ĐỒNG MINH TẤN,2511011397@student.hcmus.edu.vn,25KDL,Nhóm T6-05
9,25110114,VÒNG ĐẠI THẮNG,2511011413@student.hcmus.edu.vn,25KDL,Nhóm T6-05
10,25110124,LÊ HUY THÔNG,2511012404@student.hcmus.edu.vn,25KDL,Nhóm T6-05
11,25110127,DƯƠNG TẤN THUẬN,2511012759@student.hcmus.edu.vn,25KDL,Nhóm T6-05
12,25110133,NGÔ ĐÀO HƯƠNG TRANG,2511013320@student.hcmus.edu.vn,25KDL,Nhóm T6-03
13,25110134,HỒ HỮU TRÍ,2511013473@student.hcmus.edu.vn,25KDL,Nhóm T6-05
14,25110139,NGUYỄN MINH TÚ,2511013965@student.hcmus.edu.vn,25KDL,Nhóm T6-05
15,25110141,ĐÀM VĂN TUẤN,2511014148@student.hcmus.edu.vn,25KDL,Nhóm T6-05
16,25110142,ĐÀO ANH TUẤN,2511014283@student.hcmus.edu.vn,25KDL,Nhóm T6-05
17,25110188,TRẦN THANH BÌNH,2511018890@student.hcmus.edu.vn,25KDL,Nhóm T6-09
18,25110194,VŨ ĐỖ TIẾN ĐẠT,2511019401@student.hcmus.edu.vn,25KDL,Nhóm T6-09
19,25110207,NGUYỄN HOÀNG GIA HUY,2511020794@student.hcmus.edu.vn,25KDL,Nhóm T6-09
20,25110215,ĐOÀN CÔNG LỘC,2511021546@student.hcmus.edu.vn,25KDL,Nhóm T6-09
21,25110221,HOÀNG PHƯỚC NGUYÊN,2511022117@student.hcmus.edu.vn,25KDL,Nhóm T6-09
22,25110227,PHẠM TIẾN PHÁT,2511022748@student.hcmus.edu.vn,25KDL,Nhóm T6-09
23,25110228,NGUYỄN HOÀNG PHÚC,2511022826@student.hcmus.edu.vn,25KDL,Nhóm T6-09
24,25280001,HUỲNH THỊ MỸ HƯNG,2528000102@student.hcmus.edu.vn,25KDL,Nhóm T6-09
25,25280002,LÂM MINH THƯ,2528000205@student.hcmus.edu.vn,25KDL,Nhóm T6-09
26,25280003,TRƯƠNG HỒ MINH THUẤN,2528000383@student.hcmus.edu.vn,25KDL,Nhóm T6-02
27,25280004,VŨ KHÁNH DUY,2528000469@student.hcmus.edu.vn,25KDL,Nhóm T6-04
28,25280005,TRẦN XUÂN KHÁNH NGỌC,2528000568@student.hcmus.edu.vn,25KDL,Nhóm T6-06
29,25280006,NGUYỄN PHÚ THỊNH,2528000606@student.hcmus.edu.vn,25KDL,Nhóm T6-04
30,25280007,HUỲNH HUYỀN TRÂN,2528000778@student.hcmus.edu.vn,25KDL,Nhóm T6-01
31,25280008,HUỲNH NGỌC TRÂM ANH,2528000838@student.hcmus.edu.vn,25KDL,Nhóm T6-06
32,25280010,ĐOÀN NGUYỄN GIA BẢO,2528001062@student.hcmus.edu.vn,25KDL,Nhóm T6-04
33,25280012,PHAN VĂN ĐẠT,2528001236@student.hcmus.edu.vn,25KDL,Nhóm T6-08
34,25280013,LÝ TƯ DUNG,2528001371@student.hcmus.edu.vn,25KDL,Nhóm T6-03
35,25280014,LÊ ĐÌNH QUỐC DŨNG,2528001484@student.hcmus.edu.vn,25KDL,Nhóm T6-01
36,25280015,NGUYỄN THÙY DUYÊN,2528001559@student.hcmus.edu.vn,25KDL,Nhóm T6-07
37,25280016,PHẠM NGỌC HÂN,2528001665@student.hcmus.edu.vn,25KDL,Nhóm T6-02
38,25280017,TRẦN ĐỨC HIẾU,2528001719@student.hcmus.edu.vn,25KDL,Nhóm T6-08
39,25280018,HÀ VIỆT HOÀNG,2528001882@student.hcmus.edu.vn,25KDL,Nhóm T6-04
40,25280019,NGUYỄN QUANG HUY KHÁNH,2528001979@student.hcmus.edu.vn,25KDL,Nhóm T6-07
41,25280020,TRẦN TRỌNG KHIÊM,2528002045@student.hcmus.edu.vn,25KDL,Nhóm T6-08
42,25280021,TRẦN ĐĂNG KHOA,2528002117@student.hcmus.edu.vn,25KDL,Nhóm T6-04
43,25280022,VÕ TUẤN KIỆT,2528002255@student.hcmus.edu.vn,25KDL,Nhóm T6-02
44,25280026,LÊ KHÁNH NHẬT MINH,2528002678@student.hcmus.edu.vn,25KDL,Nhóm T6-08
45,25280027,TÔN THẤT THIỆN MINH,2528002792@student.hcmus.edu.vn,25KDL,Nhóm T6-02
46,25280028,LÂM KHẢ NGÂN,2528002841@student.hcmus.edu.vn,25KDL,Nhóm T6-02
47,25280029,TÔ NGUYỄN THẢO NGỌC,2528002987@student.hcmus.edu.vn,25KDL,Nhóm T6-07
48,25280032,NGUYỄN ĐOÀN QUỲNH NHƯ,2528003239@student.hcmus.edu.vn,25KDL,Nhóm T6-01
49,25280033,TRẦN HUỲNH NHƯ,2528003307@student.hcmus.edu.vn,25KDL,Nhóm T6-01
50,25280035,PHÙNG HOÀNG HỮU PHÚ,2528003582@student.hcmus.edu.vn,25KDL,Nhóm T6-01
51,25280036,NGUYỄN TRƯỜNG PHÚC,2528003672@student.hcmus.edu.vn,25KDL,Nhóm T6-07
52,25280038,NGUYỄN NGỌC BẢO PHƯƠNG,2528003804@student.hcmus.edu.vn,25KDL,Nhóm T6-01
53,25280040,TRƯƠNG MINH QUÂN,2528004017@student.hcmus.edu.vn,25KDL,Nhóm T6-01
54,25280041,PHAN ĐẶNG THÁI SƠN,2528004197@student.hcmus.edu.vn,25KDL,Nhóm T6-09
55,25280042,TRẦN THANH SƠN,2528004286@student.hcmus.edu.vn,25KDL,Nhóm T6-04
56,25280044,TRẦN VĂN THỊNH,2528004459@student.hcmus.edu.vn,25KDL,Nhóm T6-01
57,25280045,VÕ MINH THƠ,2528004535@student.hcmus.edu.vn,25KDL,Nhóm T6-06
58,25280050,NGUYỄN THẾ VINH,2528005068@student.hcmus.edu.vn,25KDL,Nhóm T6-04
59,25280058,PHAN TRẦN GIA HÂN,2528005813@student.hcmus.edu.vn,25KDL,Nhóm T6-06
60,25280064,NGUYỄN KIM,2528006455@student.hcmus.edu.vn,25KDL,Nhóm T6-01
61,25280068,HUỲNH THỊ KHÁNH NGÂN,2528006889@student.hcmus.edu.vn,25KDL,Nhóm T6-07
62,25280071,VÕ TRIẾT SƠN,2528007174@student.hcmus.edu.vn,25KDL,Nhóm T6-01
63,25280075,DƯƠNG ĐỨC TOÀN,2528007580@student.hcmus.edu.vn,25KDL,Nhóm T6-08
64,25280080,NGUYỄN THỊ YẾN VY,2528008010@student.hcmus.edu.vn,25KDL,Nhóm T6-06
65,25280081,PHAN NGỌC KHÁNH VY,2528008147@student.hcmus.edu.vn,25KDL,Nhóm T6-06
66,25280082,PHẠM KHÁNH AN,2528008238@student.hcmus.edu.vn,25KDL,Nhóm T6-04
67,25280083,TRẦN NGUYỄN YẾN ANH,2528008369@student.hcmus.edu.vn,25KDL,Nhóm T6-06
68,25280090,ĐẶNG THỊ KIỀU TIÊN,2528009043@student.hcmus.edu.vn,25KDL,Nhóm T6-06
69,25280092,LƯƠNG HUỲNH KỲ ANH,2528009212@student.hcmus.edu.vn,25KDL,Nhóm T6-07
70,25280093,NGUYỄN THANH MINH ANH,2528009316@student.hcmus.edu.vn,25KDL,Nhóm T6-03
71,25280094,PHẠM THẾ ANH,2528009474@student.hcmus.edu.vn,25KDL,Nhóm T6-08
72,25280096,NGUYỄN THỊ NHƯ BÌNH,2528009601@student.hcmus.edu.vn,25KDL,Nhóm T6-08
73,25280099,VŨ LONG ĐỨC,2528009997@student.hcmus.edu.vn,25KDL,Nhóm T6-02
74,25280101,LÊ NGUYỄN MINH HIẾU,2528010182@student.hcmus.edu.vn,25KDL,Nhóm T6-08
75,25280102,LÊ THANH HIẾU,2528010212@student.hcmus.edu.vn,25KDL,Nhóm T6-06
76,25280103,NGUYỄN HOÀNG MINH HIẾU,2528010397@student.hcmus.edu.vn,25KDL,Nhóm T6-02
77,25280104,NGUYỄN TRỌNG PHƯỚC HƯNG,2528010432@student.hcmus.edu.vn,25KDL,Nhóm T6-07
78,25280105,ĐẶNG ĐINH BẢO HUY,2528010561@student.hcmus.edu.vn,25KDL,Nhóm T6-07
79,25280106,ĐINH DƯƠNG HUY,2528010699@student.hcmus.edu.vn,25KDL,Nhóm T6-06
80,25280110,VŨ HOÀNG KHIÊM,2528011018@student.hcmus.edu.vn,25KDL,Nhóm T6-04
81,25280111,NGUYỄN HỒ MINH KHÔI,2528011111@student.hcmus.edu.vn,25KDL,Nhóm T6-08
82,25280112,NGUYỄN MINH KHÔI,2528011234@student.hcmus.edu.vn,25KDL,Nhóm T6-08
83,25280115,LÊ VĂN NHÂN,2528011553@student.hcmus.edu.vn,25KDL,Nhóm T6-06
84,25280122,DOÃN TRỌNG QUÝ,2528012286@student.hcmus.edu.vn,25KDL,Nhóm T6-02
85,25280124,HỒ BẢO TIÊN,2528012437@student.hcmus.edu.vn,25KDL,Nhóm T6-07
86,25280126,TRẦN NGUYỄN TUỆ VƯƠNG,2528012690@student.hcmus.edu.vn,25KDL,Nhóm T6-02
87,25280127,NGUYỄN ĐÌNH XUÂN VY,2528012777@student.hcmus.edu.vn,25KDL,Nhóm T6-07
88,25110002,PHAN NGUYỄN TIẾN KHOA,2511000268@student.hcmus.edu.vn,25TTH,T7-06
89,25110004,NGUYỄN ĐÌNH HOÀNG,2511000445@student.hcmus.edu.vn,25TTH,T7-07
90,25110010,HOÀNG NHẬT ANH,2511001022@student.hcmus.edu.vn,25TTH,T7-01
91,25110011,NGUYỄN NGỌC PHƯƠNG ANH,2511001183@student.hcmus.edu.vn,25TTH,T7-01
92,25110025,LÊ QUANG ĐẠT,2511002587@student.hcmus.edu.vn,25TTH,T7-01
93,25110043,LÊ DOÃN HUY HOÀNG,2511004363@student.hcmus.edu.vn,25TTH,Chưa phân nhóm
94,25110045,TRỊNH HUY HOÀNG,2511004526@student.hcmus.edu.vn,25TTH,T7-01
95,25110049,ĐINH XUÂN HUY,2511004929@student.hcmus.edu.vn,25TTH,T7-01
96,25110050,HUỲNH VŨ GIA HUY,2511005071@student.hcmus.edu.vn,25TTH,T7-01
97,25110051,NGUYỄN MINH HUY,2511005157@student.hcmus.edu.vn,25TTH,Chưa phân nhóm
98,25110054,ĐẶNG CHÍ KHANG,2511005423@student.hcmus.edu.vn,25TTH,Chưa phân nhóm
99,25110055,ĐÀO NGUYỄN QUỐC KHANG,2511005517@student.hcmus.edu.vn,25TTH,T7-01
100,25110063,ĐỖ ĐĂNG KHOA,2511006384@student.hcmus.edu.vn,25TTH,T7-01
101,25110070,HOÀNG HẢI LONG,2511007005@student.hcmus.edu.vn,25TTH,T7-01
102,25110076,VÕ BÌNH MINH,2511007635@student.hcmus.edu.vn,25TTH,Chưa phân nhóm
103,25110078,VŨ HOÀNG NAM,2511007870@student.hcmus.edu.vn,25TTH,T7-03
104,25110083,NGUYỄN LÊ PHI NGƯ,2511008346@student.hcmus.edu.vn,25TTH,T7-03
105,25110085,ĐINH VĂN NHẬT,2511008560@student.hcmus.edu.vn,25TTH,T7-04
106,25110091,NGUYỄN THANH NHIỆT,2511009174@student.hcmus.edu.vn,25TTH,T7-03
107,25110103,LÊ NGUYÊN PHƯƠNG,2511010369@student.hcmus.edu.vn,25TTH,T7-04
108,25110115,NGUYỄN CHÍ THÀNH,2511011549@student.hcmus.edu.vn,25TTH,T7-03
109,25110116,NGUYỄN THỊ PHƯƠNG THẢO,2511011600@student.hcmus.edu.vn,25TTH,T7-04
110,25110125,PHẠM NGUYỄN ANH THƯ,2511012520@student.hcmus.edu.vn,25TTH,T7-04
111,25110129,NGUYỄN ANH TIẾN,2511012978@student.hcmus.edu.vn,25TTH,T7-03
112,25110137,HOÀNG VIỆT TRUNG,2511013789@student.hcmus.edu.vn,25TTH,T7-04
113,25110138,NGUYỄN MINH TRUNG,2511013827@student.hcmus.edu.vn,25TTH,T7-05
114,25110146,NGUYỄN THỊÊN VĂN,2511014625@student.hcmus.edu.vn,25TTH,T7-09
115,25110151,PHẠM ĐÀO VĂN CHƯƠNG,2511015114@student.hcmus.edu.vn,25TTH,T7-09
116,25110152,NGUYỄN NGỌC DIỄM,2511015204@student.hcmus.edu.vn,25TTH,T7-08
117,25110154,ĐẶNG HỒNG DUYÊN,2511015432@student.hcmus.edu.vn,25TTH,T7-08
118,25110157,LƯƠNG GIA HÂN,2511015700@student.hcmus.edu.vn,25TTH,T7-07
119,25110158,NGUYỄN NGỌC HIỂN,2511015846@student.hcmus.edu.vn,25TTH,T7-09
120,25110163,ĐẶNG NGUYỄN GIA HUY,2511016351@student.hcmus.edu.vn,25TTH,T7-09
121,25110164,HUỲNH HOÀNG HUY,2511016420@student.hcmus.edu.vn,25TTH,T7-06
122,25110165,NGUYỄN QUANG NHẬT HY,2511016546@student.hcmus.edu.vn,25TTH,T7-09
123,25110166,LÊ ANH KHOA,2511016619@student.hcmus.edu.vn,25TTH,T7-09
124,25110168,TRƯƠNG QUANG LONG,2511016888@student.hcmus.edu.vn,25TTH,T7-07
125,25110177,NGUYỄN TẤN TRIỂN,2511017727@student.hcmus.edu.vn,25TTH,T7-07
126,25110178,HOÀNG MINH TUẤN,2511017895@student.hcmus.edu.vn,25TTH,T7-06
127,25110183,CHU ĐÌNH AN,2511018397@student.hcmus.edu.vn,25TTH,T7-09
128,25110190,NGUYỄN LÊ QUANG ĐẠI,2511019057@student.hcmus.edu.vn,25TTH,T7-06
129,25110192,LƯU CÔNG DANH,2511019208@student.hcmus.edu.vn,25TTH,T7-05
130,25110193,LÊ ĐỖ TIẾN ĐẠT,2511019356@student.hcmus.edu.vn,25TTH,T7-07
131,25110196,VÕ TRỌNG ĐỨC,2511019625@student.hcmus.edu.vn,25TTH,T7-08
132,25110197,HỨA HOÀNG THÙY DƯƠNG,2511019758@student.hcmus.edu.vn,25TTH,T7-08
133,25110198,LÊ ĐỖ BẢO DUY,2511019856@student.hcmus.edu.vn,25TTH,T7-06
134,25110199,DANH NHỰT HÀO,2511019928@student.hcmus.edu.vn,25TTH,T7-07
135,25110200,NGUYỄN HỮU HOÀ,2511020037@student.hcmus.edu.vn,25TTH,T7-03
136,25110202,PHẠM MINH HOÀNG,2511020230@student.hcmus.edu.vn,25TTH,T7-05
137,25110204,NGÔ QUỐC THIÊN HƯƠNG,2511020444@student.hcmus.edu.vn,25TTH,T7-05
138,25110206,NGUYỄN DUY MINH HUY,2511020600@student.hcmus.edu.vn,25KDL,T7-08
139,25110210,NGUYỄN MINH KHÔI,2511021028@student.hcmus.edu.vn,25TTH,T7-05
140,25110212,TRẦN KHẢ KÍNH,2511021240@student.hcmus.edu.vn,25TTH,T7-05
141,25110214,NGUYỄN HOÀNG LÂM,2511021405@student.hcmus.edu.vn,25TTH,T7-05
142,25110216,HỒ NGỌC LONG,2511021619@student.hcmus.edu.vn,25TTH,T7-05
143,25110217,NGUYỄN HOÀNG QUỐC LUẬT,2511021735@student.hcmus.edu.vn,25TTH,T7-08
144,25110218,LÊ VÕ TRÚC MY,2511021806@student.hcmus.edu.vn,25TTH,T7-08
145,25110224,LÊ TRẦN HOÀNG NHÂN,2511022435@student.hcmus.edu.vn,25TTH,T7-08
146,25110225,BÙI TẤN PHÁT,2511022596@student.hcmus.edu.vn,25TTH,T7-05
147,25110226,MAI DUY PHÁT,2511022659@student.hcmus.edu.vn,25TTH,T7-07
148,25110230,NHAN QUANG PHƯỚC,2511023050@student.hcmus.edu.vn,25TTH,T7-08
149,25110232,TÔ HỮU QUỐC,2511023299@student.hcmus.edu.vn,25TTH,T7-06
150,25110233,TRẦN LÊ DIỄM QUỲNH,2511023301@student.hcmus.edu.vn,25TTH,T7-03
151,25110234,NGÔ TRUNG SƠN,2511023484@student.hcmus.edu.vn,25KDL,T7-08
152,25110236,CHÂU HẢI THIÊN,2511023693@student.hcmus.edu.vn,25TTH,T7-06
153,25110237,TRÀ MINH THIỆN,2511023746@student.hcmus.edu.vn,25TTH,T7-06
154,25110240,LÊ NGỌC BẢO TRÂN,2511024013@student.hcmus.edu.vn,25TTH,T7-03
155,25110241,LÊ THỊ THU TRANG,2511024159@student.hcmus.edu.vn,25TTH,T7-03
156,25110243,NGÔ PHÁT TRIỂN,2511024384@student.hcmus.edu.vn,25TTH,T7-04
157,25110245,CHÂU THANH TÙNG,2511024539@student.hcmus.edu.vn,25TTH,T7-04
158,25280025,LÊ HOÀNG CHI MAI,2528002545@student.hcmus.edu.vn,25TTH,Nhóm T6-02
159,25280047,HUỲNH TÚ TOÀN,2528004708@student.hcmus.edu.vn,25TTH,T7-09
160,25280048,TRƯƠNG ĐÌNH TRÍ,2528004865@student.hcmus.edu.vn,25TTH,T7-02
161,25280052,ĐẶNG HUỲNH KHÁNH VY,2528005250@student.hcmus.edu.vn,25TTH,T7-07
162,25280054,PHAN NGUYỄN TƯỜNG VY,2528005431@student.hcmus.edu.vn,25TTH,T7-02
163,25280056,NGÔ GIA BẢO,2528005669@student.hcmus.edu.vn,25TTH,T7-03
164,25280057,VŨ THÀNH CÔNG,2528005759@student.hcmus.edu.vn,25TTH,T7-10
165,25280060,VÕ TRẦN ĐỨC HUY,2528006024@student.hcmus.edu.vn,25TTH,T7-02
166,25280063,PHẠM TRUNG KIÊN,2528006318@student.hcmus.edu.vn,25TTH,T7-02
167,25280067,HOÀNG CÔNG MINH,2528006745@student.hcmus.edu.vn,25TTH,T7-10
168,25280069,NGUYỄN TRỌNG NGHĨA,2528006924@student.hcmus.edu.vn,25TTH,T7-10
169,25280073,NGUYỄN LÊ ANH TÀI,2528007300@student.hcmus.edu.vn,25TTH,T7-02
170,25280079,NGUYỄN HỮU VINH,2528007939@student.hcmus.edu.vn,25TTH,T7-10
171,25280085,NGUYỄN ANH KIỆT,2528008545@student.hcmus.edu.vn,25TTH,T7-02
172,25280086,VÕ PHÚC LỘC,2528008645@student.hcmus.edu.vn,25TTH,T7-02
173,25280087,NGUYỄN TUYẾT MINH,2528008731@student.hcmus.edu.vn,25TTH,T7-02
174,25280089,VŨ THỊ QUỲNH NHƯ,2528008981@student.hcmus.edu.vn,25TTH,T7-07
175,25280098,NGUYỄN TRẦN NGỌC DIỆP,2528009850@student.hcmus.edu.vn,25TTH,T7-10
176,25280100,ĐINH NGUYÊN HIẾU,2528010061@student.hcmus.edu.vn,25TTH,T7-10
177,25280107,ĐINH THANH HUY,2528010750@student.hcmus.edu.vn,25TTH,T7-02
178,25280108,MAI TUẤN KHANH,2528010848@student.hcmus.edu.vn,25TTH,T7-10
179,25280113,TRẦN KHÔI NGUYÊN,2528011325@student.hcmus.edu.vn,25TTH,T7-02`;

// Trọng số các tiêu chí
const CRITERIA = [
  { id: 'c1', name: 'Tham dự & Phối hợp', weight: 0.20 },
  { id: 'c2', name: 'Quản lý công việc', weight: 0.20 },
  { id: 'c3', name: 'Giao tiếp', weight: 0.20 },
  { id: 'c4', name: 'Giải quyết vấn đề', weight: 0.15 },
  { id: 'c5', name: 'Nội dung công việc', weight: 0.25 },
];

export default function PeerReviewApp() {
  const [session, setSession] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [evaluator, setEvaluator] = useState('');
  const [scores, setScores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý dữ liệu CSV
  const students = useMemo(() => {
    const lines = rawCSV.trim().split('\n');
    return lines.map(line => {
      const parts = line.split(',');
      const mssv = parts[1];
      const name = parts[2];
      const nhomRaw = parts[5];
      const nhom = nhomRaw?.trim() || 'Chưa phân nhóm';
      const classSession = nhom.includes('T6') ? 'Sáng T6' : nhom.includes('T7') ? 'Sáng T7' : 'Chưa phân nhóm';
      return { mssv, name, nhom, classSession };
    }).filter(s => s.mssv); 
  }, []);

  const availableSessions = useMemo(() => Array.from(new Set(students.map(s => s.classSession))).filter(s => s !== 'Chưa phân nhóm'), [students]);

  const availableGroups = useMemo(() => {
    if (!session) return [];
    return Array.from(new Set(students.filter(s => s.classSession === session).map(s => s.nhom))).sort();
  }, [session, students]);

  const groupMembers = useMemo(() => {
    if (!selectedGroup) return [];
    return students.filter(s => s.nhom === selectedGroup);
  }, [selectedGroup, students]);

  const membersToEvaluate = useMemo(() => groupMembers.filter(m => m.mssv !== evaluator), [groupMembers, evaluator]);

  const handleScoreChange = (mssv, criterionId, value) => {
    let val = Number(value);
    if (val > 100) val = 100;
    if (val < 0) val = 0;
    
    setScores(prev => ({
      ...prev,
      [mssv]: { ...(prev[mssv] || {}), [criterionId]: val }
    }));
  };

  const calculateTotal = (mssv) => {
    const studentScores = scores[mssv];
    if (!studentScores) return 0;
    let total = 0;
    CRITERIA.forEach(c => { total += (studentScores[c.id] || 0) * c.weight; });
    return total.toFixed(1);
  };

  const handleSubmit = async () => {
    if (!evaluator) return alert('Vui lòng chọn tên của bạn (Người đánh giá)!');
    if (Object.keys(scores).length === 0) return alert('Vui lòng đánh giá ít nhất 1 thành viên!');

    setIsSubmitting(true);
    
    const payload = membersToEvaluate.map(member => ({
      evaluatorId: evaluator,
      evaluatorName: groupMembers.find(m => m.mssv === evaluator)?.name,
      evaluateeId: member.mssv,
      evaluateeName: member.name,
      group: selectedGroup,
      c1: scores[member.mssv]?.c1 || 0,
      c2: scores[member.mssv]?.c2 || 0,
      c3: scores[member.mssv]?.c3 || 0,
      c4: scores[member.mssv]?.c4 || 0,
      c5: scores[member.mssv]?.c5 || 0,
      totalScore: calculateTotal(member.mssv)
    }));

    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      alert('Đã gửi đánh giá thành công lên Google Sheet!');
      setScores({}); 
    } catch (error) {
      alert('Có lỗi mạng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">ĐÁNH GIÁ CHÉO KỸ NĂNG LÀM VIỆC NHÓM</h1>
      
      {/* Rubric Hướng Dẫn */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6 overflow-x-auto">
        <h2 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">Hướng dẫn đánh giá</h2>
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="p-2 border">Tiêu chí</th>
              <th className="p-2 border">Tốt (100% - 80%)</th>
              <th className="p-2 border">Khá (&lt;80% - 60%)</th>
              <th className="p-2 border">Trung bình (&lt;60% - 40%)</th>
              <th className="p-2 border">Kém (Dưới 40%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border font-semibold">1. Tham dự (20%)</td>
              <td className="p-2 border">Vắng 0; luôn đúng giờ; đóng góp ≥3 ý kiến.</td>
              <td className="p-2 border">Vắng 1 (có phép); đóng góp 2 ý kiến.</td>
              <td className="p-2 border">Vắng 2 / hay trễ; đóng góp 1 ý kiến.</td>
              <td className="p-2 border">Vắng ≥3; không hợp tác.</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">2. Quản lý CV (20%)</td>
              <td className="p-2 border">Không trễ hạn; Xong 100% việc.</td>
              <td className="p-2 border">Trễ 1 lần; Xong 80% khối lượng.</td>
              <td className="p-2 border">Trễ 2 lần; Phải hối thúc nhiều.</td>
              <td className="p-2 border">Trễ ≥3 lần; Làm đối phó, bỏ việc.</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">3. Giao tiếp (20%)</td>
              <td className="p-2 border">Lắng nghe, nhiệt tình, rep nhanh.</td>
              <td className="p-2 border">Hòa đồng, lịch sự, rep tương đối.</td>
              <td className="p-2 border">Thụ động, rep tin nhắn chậm.</td>
              <td className="p-2 border">Mất kết nối, chỉ trích, nói tục.</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">4. Giải quyết VĐ (15%)</td>
              <td className="p-2 border">Đề xuất ≥ 2 giải pháp, phản biện tốt.</td>
              <td className="p-2 border">Có giải pháp nhưng chưa tối ưu.</td>
              <td className="p-2 border">Ít phản biện, hùa theo số đông.</td>
              <td className="p-2 border">Đùn đẩy, né tránh, không giải pháp.</td>
            </tr>
            <tr>
              <td className="p-2 border font-semibold">5. Nội dung (25%)</td>
              <td className="p-2 border">Chính xác >90%, trình bày đẹp, có nguồn.</td>
              <td className="p-2 border">Chính xác 75-90%, vài lỗi chính tả.</td>
              <td className="p-2 border">Chính xác 50-75%, sai định dạng.</td>
              <td className="p-2 border">Sai lệch, đạo văn, không nguồn.</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm text-red-600 font-bold italic">
          *Lưu ý: Nếu bị đánh giá dưới 50%, điểm nhóm của cá nhân sẽ bị trừ tỷ lệ thuận.
        </p>
      </div>

      {/* Form Chọn */}
      <div className="bg-white p-5 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-medium text-gray-700 mb-1">1. Lớp / Buổi học</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" value={session} onChange={e => { setSession(e.target.value); setSelectedGroup(''); setEvaluator(''); }}>
            <option value="">-- Chọn buổi học --</option>
            {availableSessions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">2. Nhóm của bạn</label>
          <select className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" value={selectedGroup} onChange={e => { setSelectedGroup(e.target.value); setEvaluator(''); }} disabled={!session}>
            <option value="">-- Chọn nhóm --</option>
            {availableGroups.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-medium text-blue-700 mb-1">3. Người đánh giá</label>
          <select className="w-full p-2 border border-blue-400 bg-blue-50 rounded focus:ring-2 focus:ring-blue-500" value={evaluator} onChange={e => setEvaluator(e.target.value)} disabled={!selectedGroup}>
            <option value="">-- Bấm chọn tên bạn --</option>
            {groupMembers.map(m => <option key={m.mssv} value={m.mssv}>{m.name} - {m.mssv}</option>)}
          </select>
        </div>
      </div>

      {/* Bảng Đánh Giá */}
      {evaluator && (
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Chấm điểm đồng đội (0 - 100)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border min-w-[160px]">Thành viên</th>
                  {CRITERIA.map(c => (
                    <th key={c.id} className="p-3 border text-center leading-tight">
                      {c.name}<br/><span className="text-blue-600 font-bold">({c.weight * 100}%)</span>
                    </th>
                  ))}
                  <th className="p-3 border text-center font-bold bg-green-100">TỔNG %</th>
                </tr>
              </thead>
              <tbody>
                {membersToEvaluate.map(member => {
                  const total = calculateTotal(member.mssv);
                  const isDanger = total > 0 && total < 50;
                  return (
                    <tr key={member.mssv} className="hover:bg-gray-50">
                      <td className="p-3 border font-medium text-gray-800">
                        {member.name}<br/><span className="text-xs text-gray-500">{member.mssv}</span>
                      </td>
                      {CRITERIA.map(c => (
                        <td key={c.id} className="p-3 border text-center">
                          <input type="number" min="0" max="100" placeholder="0-100" className="w-16 p-2 border rounded text-center focus:outline-none focus:ring-2 focus:ring-blue-500" value={scores[member.mssv]?.[c.id] || ''} onChange={(e) => handleScoreChange(member.mssv, c.id, e.target.value)} />
                        </td>
                      ))}
                      <td className={`p-3 border text-center font-bold text-lg ${isDanger ? 'text-red-600 bg-red-50' : 'text-green-600 bg-green-50'}`}>{total}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex justify-center">
            <button onClick={handleSubmit} disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg shadow disabled:opacity-50 transition-colors text-lg">
              {isSubmitting ? 'ĐANG GỬI DỮ LIỆU...' : 'XÁC NHẬN GỬI ĐÁNH GIÁ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

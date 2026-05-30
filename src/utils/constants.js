// ============================================================
//  SmartGen — Template Registry
//  Developer: Davix HDM
//  All templates: schema definition + HTML render function
// ============================================================

const today = new Date().toISOString().split('T')[0]

export const CATEGORIES = [
  { id: 'all',         label: 'All',         icon: '⬛' },
  { id: 'certificate', label: 'Certificates', icon: '🎓' },
  { id: 'letter',      label: 'Letters',      icon: '✉️' },
  { id: 'receipt',     label: 'Receipts',     icon: '🧾' },
  { id: 'legal',       label: 'Legal / HR',   icon: '📋' },
  { id: 'cv',          label: 'CV / Resume',  icon: '👤' },
  { id: 'finance',     label: 'Finance',      icon: '💰' },
]

const wrap = (inner, style = '') =>
  `<div style="font-family:'Times New Roman',Georgia,serif;background:#fff;padding:2rem 1.8rem;line-height:1.6;${style}">${inner}</div>`

const dash   = v => v || '——————'
const money  = v => isNaN(parseFloat(v)) ? '0.00' : parseFloat(v).toFixed(2)
const upper  = v => (v || '').toUpperCase()

export const templates = [

  // ── 1. Certificate of Excellence ────────────────────────────
  {
    id: 'cert-excellence',
    name: 'Certificate of Excellence',
    category: 'certificate',
    icon: '🎖️',
    description: 'Award outstanding achievement in any field.',
    schema: [
      { name: 'orgName',       label: 'Issuing Organization',  type: 'text',     default: 'Nexus Academy' },
      { name: 'recipientName', label: 'Recipient Full Name',   type: 'text',     default: 'Emily Davis' },
      { name: 'achievement',   label: 'Achievement / Course',  type: 'text',     default: 'Advanced Leadership & Strategy' },
      { name: 'dateIssued',    label: 'Date Issued',           type: 'date',     default: today },
      { name: 'certId',        label: 'Certificate ID',        type: 'text',     default: 'CERT-2025-089' },
      { name: 'director',      label: 'Director / Signatory',  type: 'text',     default: 'Dr. A. Williams' },
      { name: 'directorTitle', label: 'Director Title',        type: 'text',     default: 'Executive Director' },
    ],
    render: d => `
      <div style="text-align:center;border:6px double #1e3a8a;padding:2.5rem 2rem;background:linear-gradient(160deg,#f0f4ff 0%,#fff 60%);font-family:'Times New Roman',serif">
        <div style="font-size:2.5rem;margin-bottom:.5rem">🎖️</div>
        <div style="font-size:.7rem;letter-spacing:.2em;color:#64748b;text-transform:uppercase;margin-bottom:.25rem">${dash(d.orgName)}</div>
        <h2 style="font-size:1.9rem;font-weight:700;color:#1e3a8a;letter-spacing:.06em;text-transform:uppercase;margin:.5rem 0 .1rem">Certificate</h2>
        <div style="font-size:.65rem;letter-spacing:.3em;color:#94a3b8;text-transform:uppercase;margin-bottom:1.5rem">of Excellence</div>
        <div style="border-top:1px solid #bfdbfe;border-bottom:1px solid #bfdbfe;padding:1rem;margin-bottom:1.5rem">
          <div style="font-size:.8rem;color:#64748b;margin-bottom:.25rem">This certificate is proudly presented to</div>
          <div style="font-size:1.8rem;font-weight:700;color:#0f172a;font-style:italic">${dash(d.recipientName)}</div>
          <div style="font-size:.8rem;color:#64748b;margin:.5rem 0 .25rem">in recognition of outstanding completion of</div>
          <div style="font-size:1.1rem;font-weight:600;color:#1e40af">${dash(d.achievement)}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;font-size:.75rem">
          <div style="text-align:left"><div style="color:#94a3b8;font-size:.65rem;text-transform:uppercase;letter-spacing:.1em">Date</div><strong>${dash(d.dateIssued)}</strong></div>
          <div style="text-align:center"><div style="border-top:1px solid #334155;width:140px;margin:0 auto .25rem"></div><div style="font-style:italic">${dash(d.director)}</div><div style="font-size:.65rem;color:#64748b">${dash(d.directorTitle)}</div></div>
          <div style="text-align:right"><div style="color:#94a3b8;font-size:.65rem;text-transform:uppercase;letter-spacing:.1em">Cert ID</div><strong style="font-family:monospace">${dash(d.certId)}</strong></div>
        </div>
      </div>`
  },

  // ── 2. Scholarship Certificate ───────────────────────────────
  {
    id: 'cert-scholarship',
    name: 'Scholarship Certificate',
    category: 'certificate',
    icon: '🎓',
    description: 'Award a scholarship grant to a deserving student.',
    schema: [
      { name: 'institutionName', label: 'Institution Name',      type: 'text',   default: 'Greenfield University' },
      { name: 'recipientName',   label: 'Student Full Name',     type: 'text',   default: 'James Mwangi' },
      { name: 'program',         label: 'Program of Study',      type: 'text',   default: 'Bachelor of Science in Computer Science' },
      { name: 'academicYear',    label: 'Academic Year',         type: 'text',   default: '2025 / 2026' },
      { name: 'awardAmount',     label: 'Award Amount (KES)',    type: 'number', default: '150000' },
      { name: 'basis',           label: 'Awarded On Basis Of',   type: 'text',   default: 'Academic Excellence & Financial Need' },
      { name: 'dateIssued',      label: 'Date Issued',           type: 'date',   default: today },
      { name: 'registrar',       label: 'Registrar Name',        type: 'text',   default: 'Prof. Grace Odhiambo' },
    ],
    render: d => `
      <div style="text-align:center;border:4px solid #047857;padding:2rem;background:linear-gradient(160deg,#ecfdf5 0%,#fff 50%);font-family:Georgia,serif">
        <div style="font-size:2rem;margin-bottom:.5rem">🎓</div>
        <div style="font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:#065f46;margin-bottom:.5rem">${dash(d.institutionName)}</div>
        <h2 style="font-size:1.6rem;font-weight:700;color:#064e3b;margin:.25rem 0">Scholarship Award Certificate</h2>
        <div style="border-top:1px solid #6ee7b7;margin:1rem 0;padding:1rem 0">
          <div style="font-size:.8rem;color:#374151">This is to certify that</div>
          <div style="font-size:1.6rem;font-weight:700;font-style:italic;color:#064e3b;margin:.35rem 0">${dash(d.recipientName)}</div>
          <div style="font-size:.8rem;color:#374151">enrolled in <strong>${dash(d.program)}</strong> has been awarded a scholarship for the academic year <strong>${dash(d.academicYear)}</strong> on the basis of <strong>${dash(d.basis)}</strong>.</div>
          <div style="margin-top:1rem;font-size:1.1rem;font-weight:700;color:#047857">Award Value: KES ${parseFloat(d.awardAmount||0).toLocaleString()}</div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.75rem">
          <div><div style="color:#9ca3af;font-size:.65rem;text-transform:uppercase">Date</div><strong>${dash(d.dateIssued)}</strong></div>
          <div style="text-align:center"><div style="border-top:1px solid #374151;width:130px;margin:0 auto .2rem"></div><div>${dash(d.registrar)}</div><div style="color:#9ca3af;font-size:.65rem">Registrar</div></div>
        </div>
      </div>`
  },

  // ── 3. Recommendation Letter ─────────────────────────────────
  {
    id: 'letter-recommendation',
    name: 'Recommendation Letter',
    category: 'letter',
    icon: '📝',
    description: 'Formal letter recommending a person for a role or opportunity.',
    schema: [
      { name: 'refName',       label: 'Referee Full Name',        type: 'text',     default: 'Dr. Carol Mutua' },
      { name: 'refTitle',      label: 'Referee Title / Position', type: 'text',     default: 'Senior Lecturer, Dept. of Engineering' },
      { name: 'orgName',       label: 'Referee Organization',     type: 'text',     default: 'Strathmore University' },
      { name: 'refEmail',      label: 'Referee Email',            type: 'text',     default: 'c.mutua@strathmore.edu' },
      { name: 'refPhone',      label: 'Referee Phone',            type: 'text',     default: '+254 722 000 000' },
      { name: 'recipientName', label: 'Candidate Name',           type: 'text',     default: 'Brian Otieno' },
      { name: 'applyingFor',   label: 'Applying For',             type: 'text',     default: 'Software Engineer at Google Kenya' },
      { name: 'relationship',  label: 'Relationship to Candidate',type: 'text',     default: 'was my student for 3 years and research assistant' },
      { name: 'bodyText',      label: 'Main Body (2-3 paragraphs)',type: 'textarea', rows: 6,
        default: `It is my genuine pleasure to recommend Brian Otieno for the Software Engineer position at Google Kenya. Brian demonstrated exceptional technical aptitude throughout his undergraduate studies, consistently ranking in the top 5% of his cohort.\n\nDuring his time as my research assistant, Brian contributed meaningfully to our distributed systems project, independently developing a fault-tolerant caching layer that reduced query latency by 40%. His ability to grasp complex concepts quickly and translate them into working solutions is remarkable.\n\nI am confident Brian will bring the same dedication, curiosity, and technical excellence to your team. I recommend him without reservation.` },
      { name: 'dateIssued',    label: 'Date',                     type: 'date',     default: today },
    ],
    render: d => wrap(`
      <div style="border-bottom:3px solid #1e3a8a;padding-bottom:1rem;margin-bottom:1.5rem">
        <strong style="font-size:1.05rem">${dash(d.refName)}</strong><br>
        <span style="font-size:.85rem;color:#475569">${dash(d.refTitle)}</span><br>
        <span style="font-size:.85rem;color:#475569">${dash(d.orgName)}</span><br>
        <span style="font-size:.8rem;color:#64748b">${dash(d.refEmail)} | ${dash(d.refPhone)}</span><br>
        <span style="font-size:.8rem;color:#64748b">${dash(d.dateIssued)}</span>
      </div>
      <p style="font-size:.9rem;color:#374151"><strong>RE: Recommendation for ${dash(d.recipientName)} — ${dash(d.applyingFor)}</strong></p>
      <p style="font-size:.85rem;color:#374151;margin-top:.75rem">To Whom It May Concern,</p>
      <div style="font-size:.87rem;color:#374151;margin-top:.75rem;white-space:pre-wrap">${dash(d.bodyText)}</div>
      <div style="margin-top:2rem;font-size:.85rem">
        <p>Yours sincerely,</p>
        <div style="margin-top:1.5rem;border-top:1px solid #cbd5e1;width:160px;padding-top:.3rem">
          <strong>${dash(d.refName)}</strong><br>
          <span style="color:#64748b;font-size:.8rem">${dash(d.refTitle)}</span>
        </div>
      </div>`)
  },

  // ── 4. Application Letter ────────────────────────────────────
  {
    id: 'letter-application',
    name: 'Application Letter',
    category: 'letter',
    icon: '✉️',
    description: 'Job or program application letter with formal structure.',
    schema: [
      { name: 'applicantName',  label: 'Your Full Name',         type: 'text',     default: 'Alex Muthoni' },
      { name: 'applicantAddr',  label: 'Your Address',           type: 'text',     default: 'P.O. Box 1234, Nairobi' },
      { name: 'applicantEmail', label: 'Your Email',             type: 'text',     default: 'alex.muthoni@email.com' },
      { name: 'applicantPhone', label: 'Your Phone',             type: 'text',     default: '+254 700 123 456' },
      { name: 'dateIssued',     label: 'Date',                   type: 'date',     default: today },
      { name: 'hiringManager',  label: 'Hiring Manager Name',    type: 'text',     default: 'The Human Resources Manager' },
      { name: 'companyName',    label: 'Company / Institution',  type: 'text',     default: 'Safaricom PLC' },
      { name: 'companyAddr',    label: 'Company Address',        type: 'text',     default: 'Safaricom House, Westlands, Nairobi' },
      { name: 'position',       label: 'Position Applied For',   type: 'text',     default: 'Senior Data Analyst' },
      { name: 'bodyText',       label: 'Letter Body',            type: 'textarea', rows: 6,
        default: `I write with great enthusiasm to apply for the Senior Data Analyst position recently advertised. With a Bachelor's degree in Statistics and four years of progressive experience in data analysis and visualization, I am confident in my ability to add significant value to your team.\n\nIn my current role at DataKE Ltd., I have led a team of analysts to build automated reporting pipelines that reduced manual reporting time by 65%. I am proficient in Python, SQL, Power BI, and R, and have a proven record of translating complex datasets into actionable business insights.\n\nI am eager to bring my skills to Safaricom PLC and contribute to data-driven decision-making at scale. I have enclosed my CV for your review and welcome the opportunity to discuss my application further.` },
    ],
    render: d => wrap(`
      <div style="margin-bottom:1.5rem;font-size:.85rem">
        <strong>${dash(d.applicantName)}</strong><br>
        ${dash(d.applicantAddr)}<br>
        ${dash(d.applicantEmail)} | ${dash(d.applicantPhone)}<br>
        <div style="margin-top:.5rem">${dash(d.dateIssued)}</div>
      </div>
      <div style="margin-bottom:1rem;font-size:.85rem">
        <strong>${dash(d.hiringManager)}</strong><br>
        ${dash(d.companyName)}<br>
        ${dash(d.companyAddr)}
      </div>
      <p style="font-size:.85rem;font-weight:600;text-decoration:underline;margin-bottom:.75rem">RE: Application for the Position of ${dash(d.position)}</p>
      <p style="font-size:.85rem">Dear ${dash(d.hiringManager)},</p>
      <div style="font-size:.87rem;margin-top:.75rem;white-space:pre-wrap">${dash(d.bodyText)}</div>
      <div style="margin-top:2rem;font-size:.85rem">
        <p>Yours faithfully,</p>
        <div style="margin-top:2rem;border-top:1px solid #cbd5e1;width:160px;padding-top:.3rem">
          <strong>${dash(d.applicantName)}</strong>
        </div>
      </div>`)
  },

  // ── 5. Business Letter ───────────────────────────────────────
  {
    id: 'letter-business',
    name: 'Official Business Letter',
    category: 'letter',
    icon: '🏢',
    description: 'Formal inter-company or client correspondence.',
    schema: [
      { name: 'senderName',    label: 'Sender Name',       type: 'text',     default: 'Michael Kamau' },
      { name: 'senderTitle',   label: 'Sender Title',      type: 'text',     default: 'Director of Operations' },
      { name: 'orgName',       label: 'Your Organization', type: 'text',     default: 'Apex Dynamics Ltd.' },
      { name: 'orgAddress',    label: 'Organization Address',type: 'text',   default: 'Upper Hill, Nairobi, Kenya' },
      { name: 'dateIssued',    label: 'Letter Date',       type: 'date',     default: today },
      { name: 'recipientName', label: 'Recipient Name',    type: 'text',     default: 'Ms. Sarah Otieno' },
      { name: 'recipientOrg',  label: 'Recipient Company', type: 'text',     default: 'TechBridge Africa' },
      { name: 'subjectLine',   label: 'Subject',           type: 'text',     default: 'Partnership Proposal — Q3 2025' },
      { name: 'bodyText',      label: 'Letter Body',       type: 'textarea', rows: 5,
        default: `Dear Ms. Otieno,\n\nWe are pleased to reach out regarding an exciting partnership opportunity between Apex Dynamics Ltd. and TechBridge Africa. We believe our complementary capabilities in operational logistics and technology infrastructure position us uniquely to deliver transformative outcomes for the East African market.\n\nWe would welcome the opportunity to arrange a meeting at your earliest convenience to discuss the specifics of this proposal.\n\nWe look forward to your response.` },
      { name: 'refNumber',     label: 'Reference Number',  type: 'text',     default: 'ADL/OPS/2025/042' },
    ],
    render: d => wrap(`
      <div style="display:flex;justify-content:space-between;border-bottom:2px solid #1e3a8a;padding-bottom:1rem;margin-bottom:1.5rem">
        <div>
          <strong style="font-size:1.1rem">${dash(d.orgName)}</strong><br>
          <span style="font-size:.8rem;color:#475569">${dash(d.orgAddress)}</span>
        </div>
        <div style="text-align:right;font-size:.8rem;color:#475569">
          Ref: <strong style="font-family:monospace">${dash(d.refNumber)}</strong><br>
          Date: ${dash(d.dateIssued)}
        </div>
      </div>
      <div style="font-size:.85rem;margin-bottom:1rem">
        <strong>${dash(d.recipientName)}</strong><br>
        ${dash(d.recipientOrg)}
      </div>
      <p style="font-weight:700;font-size:.9rem;margin-bottom:1rem;border-left:3px solid #1e3a8a;padding-left:.75rem">RE: ${dash(d.subjectLine)}</p>
      <div style="font-size:.87rem;white-space:pre-wrap">${dash(d.bodyText)}</div>
      <div style="margin-top:2rem;font-size:.85rem">
        <p>Yours sincerely,</p>
        <div style="margin-top:2rem;border-top:1px solid #94a3b8;width:160px;padding-top:.3rem">
          <strong>${dash(d.senderName)}</strong><br>
          <span style="color:#64748b;font-size:.8rem">${dash(d.senderTitle)}</span><br>
          <span style="color:#64748b;font-size:.8rem">${dash(d.orgName)}</span>
        </div>
      </div>`)
  },

  // ── 6. Leave Application ─────────────────────────────────────
  {
    id: 'letter-leave',
    name: 'Leave Application',
    category: 'letter',
    icon: '🏖️',
    description: 'Formal leave request for annual, sick, or maternity leave.',
    schema: [
      { name: 'employeeName',  label: 'Employee Full Name',  type: 'text',   default: 'Janet Wanjiru' },
      { name: 'employeeId',    label: 'Employee ID',         type: 'text',   default: 'EMP-2023-114' },
      { name: 'department',    label: 'Department',          type: 'text',   default: 'Finance & Accounts' },
      { name: 'managerName',   label: 'Manager / HR Name',   type: 'text',   default: 'Mr. James Kariuki' },
      { name: 'leaveType',     label: 'Type of Leave',       type: 'select', default: 'Annual Leave',
        options: ['Annual Leave','Sick Leave','Maternity Leave','Paternity Leave','Compassionate Leave','Study Leave','Unpaid Leave'] },
      { name: 'fromDate',      label: 'From Date',           type: 'date',   default: today },
      { name: 'toDate',        label: 'To Date',             type: 'date',   default: today },
      { name: 'totalDays',     label: 'Total Days Requested',type: 'number', default: '5' },
      { name: 'reason',        label: 'Reason for Leave',    type: 'textarea', rows: 3,
        default: 'I would like to request annual leave to attend to pressing family matters and personal obligations during this period.' },
      { name: 'dateIssued',    label: 'Application Date',    type: 'date',   default: today },
    ],
    render: d => wrap(`
      <h3 style="text-align:center;font-size:1.1rem;font-weight:700;border-bottom:2px solid #0f172a;padding-bottom:.5rem;margin-bottom:1.5rem">LEAVE APPLICATION FORM</h3>
      <table style="width:100%;font-size:.85rem;border-collapse:collapse;margin-bottom:1rem">
        <tr><td style="width:40%;padding:.3rem 0;color:#475569;font-weight:600">Employee Name:</td><td>${dash(d.employeeName)}</td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">Employee ID:</td><td style="font-family:monospace">${dash(d.employeeId)}</td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">Department:</td><td>${dash(d.department)}</td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">Type of Leave:</td><td><strong>${dash(d.leaveType)}</strong></td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">From:</td><td>${dash(d.fromDate)}</td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">To:</td><td>${dash(d.toDate)}</td></tr>
        <tr><td style="padding:.3rem 0;color:#475569;font-weight:600">Total Days:</td><td><strong>${dash(d.totalDays)} day(s)</strong></td></tr>
      </table>
      <div style="font-size:.85rem;margin-bottom:1.5rem">
        <div style="font-weight:600;color:#475569;margin-bottom:.3rem">Reason:</div>
        <div style="border-left:3px solid #e2e8f0;padding-left:.75rem;white-space:pre-wrap">${dash(d.reason)}</div>
      </div>
      <p style="font-size:.85rem">To: <strong>${dash(d.managerName)}</strong></p>
      <p style="font-size:.85rem;margin-top:.25rem">I hereby request approval for the above-stated leave. I commit to ensuring adequate handover of my duties before the commencement of this leave.</p>
      <div style="display:flex;justify-content:space-between;margin-top:2rem;font-size:.8rem">
        <div>
          <div style="border-top:1px solid #94a3b8;width:160px;padding-top:.3rem">
            <strong>${dash(d.employeeName)}</strong><br>
            <span style="color:#64748b">Employee Signature & Date: ${dash(d.dateIssued)}</span>
          </div>
        </div>
        <div>
          <div style="border-top:1px solid #94a3b8;width:160px;padding-top:.3rem">
            <strong>${dash(d.managerName)}</strong><br>
            <span style="color:#64748b">Supervisor Signature & Date</span>
          </div>
        </div>
      </div>`)
  },

  // ── 7. Employment Contract ───────────────────────────────────
  {
    id: 'legal-employment',
    name: 'Employment Contract',
    category: 'legal',
    icon: '📋',
    description: 'Standard employment contract between employer and employee.',
    schema: [
      { name: 'companyName',   label: 'Employer / Company Name', type: 'text',   default: 'Zenith Solutions Ltd.' },
      { name: 'companyAddr',   label: 'Company Address',         type: 'text',   default: 'Kilimani, Nairobi, Kenya' },
      { name: 'employeeName',  label: 'Employee Full Name',      type: 'text',   default: 'David Mutuku' },
      { name: 'employeeId',    label: 'Employee ID / National ID',type: 'text',  default: '30123456' },
      { name: 'position',      label: 'Job Title / Position',    type: 'text',   default: 'Full-Stack Developer' },
      { name: 'department',    label: 'Department',              type: 'text',   default: 'Engineering' },
      { name: 'startDate',     label: 'Start Date',              type: 'date',   default: today },
      { name: 'contractType',  label: 'Contract Type',           type: 'select', default: 'Permanent',
        options: ['Permanent','Fixed-Term (1 Year)','Fixed-Term (2 Years)','Probationary (3 Months)','Part-Time','Contract'] },
      { name: 'grossSalary',   label: 'Gross Monthly Salary (KES)', type: 'number', default: '120000' },
      { name: 'probation',     label: 'Probation Period',        type: 'text',   default: '3 months' },
      { name: 'hrManager',     label: 'HR Manager / Director',   type: 'text',   default: 'Ms. Grace Odhiambo' },
      { name: 'dateIssued',    label: 'Contract Date',           type: 'date',   default: today },
    ],
    render: d => wrap(`
      <h3 style="text-align:center;font-size:1.2rem;font-weight:700;letter-spacing:.05em;border-bottom:2px solid #0f172a;padding-bottom:.5rem;margin-bottom:1.5rem">CONTRACT OF EMPLOYMENT</h3>
      <p style="font-size:.85rem;margin-bottom:1rem">This Contract of Employment is entered into between <strong>${dash(d.companyName)}</strong> (hereinafter "the Employer") of ${dash(d.companyAddr)}, and <strong>${dash(d.employeeName)}</strong>, ID No. <strong style="font-family:monospace">${dash(d.employeeId)}</strong> (hereinafter "the Employee").</p>
      <table style="width:100%;font-size:.82rem;border-collapse:collapse;margin-bottom:1rem">
        ${[
          ['Position / Title', d.position],
          ['Department', d.department],
          ['Contract Type', d.contractType],
          ['Commencement Date', d.startDate],
          ['Probation Period', d.probation],
          ['Gross Monthly Salary', `KES ${parseFloat(d.grossSalary||0).toLocaleString()}`],
        ].map(([k,v]) => `<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:.4rem .5rem;width:45%;background:#f8fafc;font-weight:600;color:#475569">${k}</td><td style="padding:.4rem .5rem">${dash(v)}</td></tr>`).join('')}
      </table>
      <p style="font-size:.8rem;color:#475569;margin-bottom:1rem"><strong>Terms:</strong> The Employee agrees to abide by all company policies, maintain confidentiality of company information, and perform duties diligently. Either party may terminate this contract with notice as per the Employment Act (Kenya) 2007 or its amendments.</p>
      <div style="display:flex;justify-content:space-between;margin-top:2rem;font-size:.8rem">
        <div>
          <div style="border-top:1px solid #94a3b8;width:160px;padding-top:.3rem">
            <strong>${dash(d.hrManager)}</strong><br>
            <span style="color:#64748b">For: ${dash(d.companyName)}</span><br>
            <span style="color:#64748b">Date: ${dash(d.dateIssued)}</span>
          </div>
        </div>
        <div>
          <div style="border-top:1px solid #94a3b8;width:160px;padding-top:.3rem">
            <strong>${dash(d.employeeName)}</strong><br>
            <span style="color:#64748b">Employee Signature</span><br>
            <span style="color:#64748b">Date: ____________________</span>
          </div>
        </div>
      </div>`)
  },

  // ── 8. Official Receipt ──────────────────────────────────────
  {
    id: 'receipt-official',
    name: 'Official Receipt',
    category: 'receipt',
    icon: '🧾',
    description: 'Formal payment receipt for goods or services rendered.',
    schema: [
      { name: 'orgName',      label: 'Organization Name',     type: 'text',   default: 'HDM Services Ltd.' },
      { name: 'orgAddr',      label: 'Organization Address',  type: 'text',   default: 'Westlands, Nairobi | info@hdm.co.ke' },
      { name: 'receiptNo',    label: 'Receipt Number',        type: 'text',   default: 'RCT-2025-0042' },
      { name: 'receivedFrom', label: 'Received From',         type: 'text',   default: 'Acme Corporation' },
      { name: 'description',  label: 'Payment Description',   type: 'text',   default: 'Web Development Services - Phase 1' },
      { name: 'paymentMode',  label: 'Payment Method',        type: 'select', default: 'M-Pesa',
        options: ['Cash','M-Pesa','Bank Transfer','Cheque','Credit Card','PayPal'] },
      { name: 'mpesaRef',     label: 'Transaction / Cheque Ref', type: 'text', default: 'QFE72KPLA8' },
      { name: 'currency',     label: 'Currency',              type: 'select', default: 'KES',
        options: ['KES','USD','EUR','GBP','UGX','TZS'] },
      { name: 'amount',       label: 'Amount Paid',           type: 'number', default: '75000' },
      { name: 'dateIssued',   label: 'Date Received',         type: 'date',   default: today },
      { name: 'issuedBy',     label: 'Received By (Name)',    type: 'text',   default: 'Jane Waweru' },
    ],
    render: d => {
      const amt = parseFloat(d.amount || 0)
      return `
      <div style="font-family:'Courier New',monospace;background:#fff;border:2px solid #0f172a;padding:1.5rem">
        <div style="text-align:center;border-bottom:2px dashed #0f172a;padding-bottom:1rem;margin-bottom:1rem">
          <div style="font-size:1.2rem;font-weight:700;letter-spacing:.1em">${upper(d.orgName)}</div>
          <div style="font-size:.75rem;color:#475569">${dash(d.orgAddr)}</div>
          <div style="font-size:1.1rem;font-weight:700;letter-spacing:.15em;margin-top:.5rem">OFFICIAL RECEIPT</div>
          <div style="font-size:.75rem">No: <strong>${dash(d.receiptNo)}</strong></div>
        </div>
        <table style="width:100%;font-size:.82rem;border-collapse:collapse">
          <tr><td style="padding:.3rem 0;width:40%;color:#475569">Date:</td><td><strong>${dash(d.dateIssued)}</strong></td></tr>
          <tr><td style="padding:.3rem 0;color:#475569">Received From:</td><td><strong>${dash(d.receivedFrom)}</strong></td></tr>
          <tr><td style="padding:.3rem 0;color:#475569">Description:</td><td>${dash(d.description)}</td></tr>
          <tr><td style="padding:.3rem 0;color:#475569">Payment Mode:</td><td>${dash(d.paymentMode)}</td></tr>
          <tr><td style="padding:.3rem 0;color:#475569">Ref / Txn No:</td><td style="font-family:monospace">${dash(d.mpesaRef)}</td></tr>
        </table>
        <div style="border-top:2px dashed #0f172a;border-bottom:2px dashed #0f172a;padding:.75rem 0;margin:1rem 0;text-align:center">
          <div style="font-size:.75rem;color:#475569;text-transform:uppercase;letter-spacing:.1em">Amount Received</div>
          <div style="font-size:1.8rem;font-weight:700">${dash(d.currency)} ${amt.toLocaleString('en-KE', {minimumFractionDigits:2})}</div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.78rem">
          <div>Received By:<br><strong>${dash(d.issuedBy)}</strong><br>_________________<br><span style="color:#94a3b8">Signature</span></div>
          <div style="text-align:right;color:#475569;font-size:.7rem">*This is an official receipt.*<br>Keep for your records.</div>
        </div>
      </div>`
    }
  },

  // ── 9. Quotation / Estimate ──────────────────────────────────
  {
    id: 'finance-quotation',
    name: 'Quotation / Estimate',
    category: 'finance',
    icon: '💰',
    description: 'Professional business quotation for products or services.',
    schema: [
      { name: 'orgName',      label: 'Your Company Name',     type: 'text',   default: 'Davix HDM Solutions' },
      { name: 'orgAddr',      label: 'Company Address',       type: 'text',   default: 'Nairobi, Kenya | davix@hdm.co.ke' },
      { name: 'quoteNo',      label: 'Quotation Number',      type: 'text',   default: 'QT-2025-019' },
      { name: 'clientName',   label: 'Client Name',           type: 'text',   default: 'BuildRight Construction Ltd.' },
      { name: 'clientAddr',   label: 'Client Address',        type: 'text',   default: 'Industrial Area, Nairobi' },
      { name: 'item1',        label: 'Item 1 Description',    type: 'text',   default: 'Website Design & Development' },
      { name: 'qty1',         label: 'Qty 1',                 type: 'number', default: '1' },
      { name: 'rate1',        label: 'Unit Rate 1 (KES)',     type: 'number', default: '85000' },
      { name: 'item2',        label: 'Item 2 Description',    type: 'text',   default: 'SEO Setup & Configuration' },
      { name: 'qty2',         label: 'Qty 2',                 type: 'number', default: '1' },
      { name: 'rate2',        label: 'Unit Rate 2 (KES)',     type: 'number', default: '25000' },
      { name: 'item3',        label: 'Item 3 Description',    type: 'text',   default: 'Monthly Maintenance (3 months)' },
      { name: 'qty3',         label: 'Qty 3',                 type: 'number', default: '3' },
      { name: 'rate3',        label: 'Unit Rate 3 (KES)',     type: 'number', default: '8000' },
      { name: 'vatRate',      label: 'VAT %',                 type: 'number', default: '16' },
      { name: 'validDays',    label: 'Valid for (days)',       type: 'number', default: '30' },
      { name: 'dateIssued',   label: 'Quote Date',            type: 'date',   default: today },
      { name: 'preparedBy',   label: 'Prepared By',           type: 'text',   default: 'Davix HDM' },
    ],
    render: d => {
      const sub1 = (parseFloat(d.qty1)||0) * (parseFloat(d.rate1)||0)
      const sub2 = (parseFloat(d.qty2)||0) * (parseFloat(d.rate2)||0)
      const sub3 = (parseFloat(d.qty3)||0) * (parseFloat(d.rate3)||0)
      const subtotal = sub1 + sub2 + sub3
      const vat = subtotal * ((parseFloat(d.vatRate)||0) / 100)
      const total = subtotal + vat
      const fmt = n => n.toLocaleString('en-KE', {minimumFractionDigits:2})
      return `
      <div style="font-family:'Times New Roman',serif;background:#fff;padding:1.5rem;border:1px solid #e2e8f0">
        <div style="display:flex;justify-content:space-between;border-bottom:3px solid #1e3a8a;padding-bottom:1rem;margin-bottom:1.5rem">
          <div>
            <div style="font-size:1.2rem;font-weight:700;color:#1e3a8a">${dash(d.orgName)}</div>
            <div style="font-size:.75rem;color:#64748b">${dash(d.orgAddr)}</div>
          </div>
          <div style="text-align:right">
            <div style="font-size:1.3rem;font-weight:700;letter-spacing:.05em;color:#0f172a">QUOTATION</div>
            <div style="font-size:.78rem;font-family:monospace">No: ${dash(d.quoteNo)}</div>
            <div style="font-size:.75rem;color:#64748b">Date: ${dash(d.dateIssued)}</div>
            <div style="font-size:.75rem;color:#64748b">Valid: ${dash(d.validDays)} days</div>
          </div>
        </div>
        <div style="font-size:.83rem;margin-bottom:1rem">
          <strong>Prepared for:</strong><br>${dash(d.clientName)}<br><span style="color:#64748b">${dash(d.clientAddr)}</span>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:.82rem">
          <thead>
            <tr style="background:#0f172a;color:#fff">
              <th style="padding:.5rem;text-align:left">Description</th>
              <th style="padding:.5rem;text-align:center">Qty</th>
              <th style="padding:.5rem;text-align:right">Rate (KES)</th>
              <th style="padding:.5rem;text-align:right">Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            ${[[d.item1,d.qty1,d.rate1,sub1],[d.item2,d.qty2,d.rate2,sub2],[d.item3,d.qty3,d.rate3,sub3]].map(([i,q,r,s],idx) => i ? `
            <tr style="border-bottom:1px solid #f1f5f9;background:${idx%2===0?'#fff':'#f8fafc'}">
              <td style="padding:.4rem .5rem">${dash(i)}</td>
              <td style="padding:.4rem .5rem;text-align:center">${q||'—'}</td>
              <td style="padding:.4rem .5rem;text-align:right">${fmt(parseFloat(r)||0)}</td>
              <td style="padding:.4rem .5rem;text-align:right">${fmt(s)}</td>
            </tr>` : '').join('')}
          </tbody>
          <tfoot>
            <tr><td colspan="3" style="padding:.4rem .5rem;text-align:right;font-weight:600">Subtotal:</td><td style="padding:.4rem .5rem;text-align:right">KES ${fmt(subtotal)}</td></tr>
            <tr><td colspan="3" style="padding:.4rem .5rem;text-align:right;font-weight:600">VAT (${d.vatRate||0}%):</td><td style="padding:.4rem .5rem;text-align:right">KES ${fmt(vat)}</td></tr>
            <tr style="background:#0f172a;color:#fff"><td colspan="3" style="padding:.5rem;text-align:right;font-weight:700">TOTAL:</td><td style="padding:.5rem;text-align:right;font-weight:700">KES ${fmt(total)}</td></tr>
          </tfoot>
        </table>
        <div style="margin-top:1.5rem;font-size:.78rem;color:#64748b">Prepared by: <strong>${dash(d.preparedBy)}</strong> | This quotation is valid for ${dash(d.validDays)} days from the date of issue.</div>
      </div>`
    }
  },

  // ── 10. Professional Invoice ─────────────────────────────────
  {
    id: 'finance-invoice',
    name: 'Professional Invoice',
    category: 'finance',
    icon: '📑',
    description: 'Detailed invoice with line items, VAT, and due date.',
    schema: [
      { name: 'orgName',     label: 'Your Company',          type: 'text',   default: 'HDM Digital Agency' },
      { name: 'orgAddr',     label: 'Your Address',          type: 'text',   default: 'Westlands, Nairobi | accounts@hdm.co.ke' },
      { name: 'invoiceNo',   label: 'Invoice Number',        type: 'text',   default: 'INV-2025-042' },
      { name: 'billTo',      label: 'Bill To (Client)',      type: 'text',   default: 'Acme Corp — Attn: Finance Dept' },
      { name: 'billAddr',    label: 'Client Address',        type: 'text',   default: 'Kilimani, Nairobi' },
      { name: 'invoiceDate', label: 'Invoice Date',          type: 'date',   default: today },
      { name: 'dueDate',     label: 'Due Date',              type: 'date',   default: today },
      { name: 'item1',       label: 'Service / Item 1',      type: 'text',   default: 'UI/UX Design — 3 screens' },
      { name: 'amt1',        label: 'Amount 1 (KES)',        type: 'number', default: '45000' },
      { name: 'item2',       label: 'Service / Item 2',      type: 'text',   default: 'React Frontend Development' },
      { name: 'amt2',        label: 'Amount 2 (KES)',        type: 'number', default: '90000' },
      { name: 'item3',       label: 'Service / Item 3',      type: 'text',   default: 'API Integration & Testing' },
      { name: 'amt3',        label: 'Amount 3 (KES)',        type: 'number', default: '35000' },
      { name: 'vatRate',     label: 'VAT %',                 type: 'number', default: '16' },
      { name: 'bankName',    label: 'Bank Name',             type: 'text',   default: 'Equity Bank Kenya' },
      { name: 'accountNo',   label: 'Account Number',        type: 'text',   default: '0190259876201' },
      { name: 'accountName', label: 'Account Name',          type: 'text',   default: 'HDM Digital Agency Ltd.' },
    ],
    render: d => {
      const a1 = parseFloat(d.amt1)||0, a2 = parseFloat(d.amt2)||0, a3 = parseFloat(d.amt3)||0
      const subtotal = a1+a2+a3
      const vat = subtotal*(parseFloat(d.vatRate||0)/100)
      const total = subtotal+vat
      const fmt = n => `KES ${n.toLocaleString('en-KE',{minimumFractionDigits:2})}`
      return `
      <div style="font-family:'Times New Roman',serif;background:#fff;border:1px solid #e2e8f0;padding:1.5rem">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1.5rem">
          <div><div style="font-size:1.2rem;font-weight:700">${dash(d.orgName)}</div><div style="font-size:.75rem;color:#64748b">${dash(d.orgAddr)}</div></div>
          <div style="text-align:right"><div style="font-size:1.8rem;font-weight:300;color:#94a3b8;letter-spacing:.05em">INVOICE</div><div style="font-family:monospace;font-size:.8rem;font-weight:700">${dash(d.invoiceNo)}</div></div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;font-size:.83rem">
          <div><div style="font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;margin-bottom:.25rem">Bill To</div><strong>${dash(d.billTo)}</strong><br><span style="color:#64748b">${dash(d.billAddr)}</span></div>
          <div style="text-align:right"><div style="font-size:.65rem;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;margin-bottom:.25rem">Invoice Details</div>Invoice Date: <strong>${dash(d.invoiceDate)}</strong><br>Due Date: <strong>${dash(d.dueDate)}</strong></div>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:.82rem;margin-bottom:1rem">
          <thead><tr style="border-bottom:2px solid #0f172a"><th style="padding:.4rem;text-align:left">Description</th><th style="padding:.4rem;text-align:right">Amount</th></tr></thead>
          <tbody>
            ${[[d.item1,a1],[d.item2,a2],[d.item3,a3]].filter(([i])=>i).map(([i,a]) =>
              `<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:.5rem">${i}</td><td style="padding:.5rem;text-align:right">${fmt(a)}</td></tr>`
            ).join('')}
          </tbody>
          <tfoot>
            <tr><td style="padding:.4rem;text-align:right;color:#64748b">Subtotal:</td><td style="padding:.4rem;text-align:right">${fmt(subtotal)}</td></tr>
            <tr><td style="padding:.4rem;text-align:right;color:#64748b">VAT ${d.vatRate||0}%:</td><td style="padding:.4rem;text-align:right">${fmt(vat)}</td></tr>
            <tr style="border-top:2px solid #0f172a"><td style="padding:.5rem;text-align:right;font-weight:700;font-size:1rem">Total Due:</td><td style="padding:.5rem;text-align:right;font-weight:700;font-size:1.1rem">${fmt(total)}</td></tr>
          </tfoot>
        </table>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:.75rem;font-size:.78rem;border-radius:4px">
          <strong>Payment Details:</strong> ${dash(d.bankName)} | Acc: <span style="font-family:monospace">${dash(d.accountNo)}</span> | Name: ${dash(d.accountName)}
        </div>
        <p style="font-size:.75rem;color:#94a3b8;margin-top:.75rem;text-align:center">Thank you for your business. Please quote invoice number ${dash(d.invoiceNo)} on all payments.</p>
      </div>`
    }
  },

  // ── 11. Curriculum Vitae ─────────────────────────────────────
  {
    id: 'cv-standard',
    name: 'Curriculum Vitae (CV)',
    category: 'cv',
    icon: '👤',
    description: 'Clean, professional CV / résumé layout.',
    schema: [
      { name: 'fullName',      label: 'Full Name',             type: 'text',     default: 'Grace Njeri Kamau' },
      { name: 'jobTitle',      label: 'Professional Title',    type: 'text',     default: 'Senior Software Engineer' },
      { name: 'email',         label: 'Email',                 type: 'text',     default: 'grace.kamau@email.com' },
      { name: 'phone',         label: 'Phone',                 type: 'text',     default: '+254 722 456 789' },
      { name: 'location',      label: 'Location',              type: 'text',     default: 'Nairobi, Kenya' },
      { name: 'linkedin',      label: 'LinkedIn / Portfolio',  type: 'text',     default: 'linkedin.com/in/grace-kamau' },
      { name: 'summary',       label: 'Professional Summary',  type: 'textarea', rows: 3,
        default: 'Results-driven Software Engineer with 6+ years of experience building scalable web applications. Adept in React, Node.js, and cloud infrastructure. Passionate about clean code, mentorship, and delivering user-centric products.' },
      { name: 'experience',    label: 'Work Experience',       type: 'textarea', rows: 5,
        default: 'Senior Software Engineer | Safaricom PLC | 2022–Present\n• Led migration of monolithic API to microservices, reducing load times by 45%\n• Mentored 4 junior engineers; introduced code review standards\n\nSoftware Developer | Andela Kenya | 2019–2022\n• Built 3 production React applications serving 100k+ users\n• Reduced bug backlog by 70% through systematic testing implementation' },
      { name: 'education',     label: 'Education',             type: 'textarea', rows: 3,
        default: 'BSc. Computer Science | University of Nairobi | 2015–2019\nAWS Certified Solutions Architect | 2022\nGoogle Professional Data Engineer | 2023' },
      { name: 'skills',        label: 'Key Skills (comma-separated)', type: 'text', default: 'React, Node.js, TypeScript, MongoDB, AWS, Docker, PostgreSQL, Python, Git, Agile/Scrum' },
    ],
    render: d => {
      const skills = (d.skills||'').split(',').map(s=>s.trim()).filter(Boolean)
      return `
      <div style="font-family:'Times New Roman',serif;background:#fff;display:flex;min-height:400px">
        <div style="width:35%;background:#0f172a;color:#fff;padding:1.5rem .75rem">
          <div style="margin-bottom:1.5rem">
            <div style="font-size:1.2rem;font-weight:700;line-height:1.2">${dash(d.fullName)}</div>
            <div style="font-size:.75rem;color:#93c5fd;margin-top:.25rem">${dash(d.jobTitle)}</div>
          </div>
          <div style="font-size:.72rem;margin-bottom:1.5rem;line-height:1.8">
            <div style="color:#94a3b8;font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.25rem">Contact</div>
            <div>📧 ${dash(d.email)}</div>
            <div>📞 ${dash(d.phone)}</div>
            <div>📍 ${dash(d.location)}</div>
            <div>🔗 ${dash(d.linkedin)}</div>
          </div>
          <div>
            <div style="color:#94a3b8;font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.5rem">Skills</div>
            <div style="display:flex;flex-wrap:wrap;gap:.3rem">
              ${skills.map(s=>`<span style="background:#1e293b;color:#93c5fd;padding:.15rem .4rem;border-radius:3px;font-size:.65rem">${s}</span>`).join('')}
            </div>
          </div>
        </div>
        <div style="flex:1;padding:1.5rem;font-size:.82rem">
          <section style="margin-bottom:1rem">
            <h3 style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #0f172a;padding-bottom:.2rem;margin-bottom:.5rem">Profile</h3>
            <p style="color:#374151">${dash(d.summary)}</p>
          </section>
          <section style="margin-bottom:1rem">
            <h3 style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #0f172a;padding-bottom:.2rem;margin-bottom:.5rem">Experience</h3>
            <div style="color:#374151;white-space:pre-wrap">${dash(d.experience)}</div>
          </section>
          <section>
            <h3 style="font-size:.85rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;border-bottom:2px solid #0f172a;padding-bottom:.2rem;margin-bottom:.5rem">Education & Certifications</h3>
            <div style="color:#374151;white-space:pre-wrap">${dash(d.education)}</div>
          </section>
        </div>
      </div>`
    }
  },

  // ── 12. Cover Letter ─────────────────────────────────────────
  {
    id: 'letter-cover',
    name: 'Modern Cover Letter',
    category: 'letter',
    icon: '📨',
    description: 'Contemporary cover letter with a professional accent bar.',
    schema: [
      { name: 'applicantName',  label: 'Your Full Name',    type: 'text',     default: 'Alex Rivera' },
      { name: 'applicantEmail', label: 'Email',             type: 'text',     default: 'alex.rivera@email.com' },
      { name: 'applicantPhone', label: 'Phone',             type: 'text',     default: '+254 700 000 111' },
      { name: 'position',       label: 'Position',          type: 'text',     default: 'Product Manager' },
      { name: 'companyName',    label: 'Company',           type: 'text',     default: 'InnovateTech Kenya' },
      { name: 'hiringManager',  label: 'Hiring Manager',    type: 'text',     default: 'Taylor Smith' },
      { name: 'dateIssued',     label: 'Date',              type: 'date',     default: today },
      { name: 'bodyText',       label: 'Letter Body',       type: 'textarea', rows: 6,
        default: `I am writing to express my enthusiasm for the Product Manager role at InnovateTech Kenya. With 6+ years of experience driving cross-functional teams to deliver high-impact digital products, I am confident I can contribute meaningfully to your mission.\n\nIn my previous role, I led the end-to-end launch of a fintech product that onboarded 250,000 users within the first quarter, achieving a 4.7-star app store rating. I excel at translating customer insights into clear product requirements and rallying engineering, design, and marketing teams around a shared vision.\n\nI am particularly excited by InnovateTech's focus on financial inclusion in East Africa — a space I am deeply passionate about. I would welcome the opportunity to discuss how my experience aligns with your goals.` },
    ],
    render: d => `
      <div style="font-family:'Times New Roman',serif;background:#fff;border-left:5px solid #1e3a8a;padding:1.5rem">
        <div style="margin-bottom:1.5rem">
          <div style="font-size:1.1rem;font-weight:700">${dash(d.applicantName)}</div>
          <div style="font-size:.78rem;color:#475569">${dash(d.applicantEmail)} | ${dash(d.applicantPhone)}</div>
          <div style="font-size:.78rem;color:#94a3b8;margin-top:.2rem">${dash(d.dateIssued)}</div>
        </div>
        <div style="font-size:.85rem;margin-bottom:1rem">
          <strong>${dash(d.hiringManager)}</strong><br>
          Hiring Manager, ${dash(d.companyName)}
        </div>
        <p style="font-size:.85rem;font-weight:600;color:#1e3a8a;margin-bottom:.75rem">Re: Application — ${dash(d.position)}</p>
        <p style="font-size:.85rem">Dear ${dash(d.hiringManager)},</p>
        <div style="font-size:.87rem;margin-top:.75rem;white-space:pre-wrap;color:#374151">${dash(d.bodyText)}</div>
        <div style="margin-top:2rem;font-size:.85rem">
          <p>Warm regards,</p>
          <div style="margin-top:1.5rem;border-top:1px solid #cbd5e1;width:150px;padding-top:.25rem;font-weight:700">${dash(d.applicantName)}</div>
        </div>
      </div>`
  },

]

export default templates
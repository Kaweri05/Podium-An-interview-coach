(function(){
"use strict";

/* ============================================================
   DATA: QUESTION BANK
   ============================================================ */
const INTRO_QUESTION = {
  q:"Let's warm up. Say your name clearly, then one confident line about who you are.",
  tips:["Say your name first, slowly and clearly — it's the very first thing an interviewer hears and forms an instant impression.",
        "Follow it with one line: your role or field, e.g. 'Hi, I'm Aditi, a final-year Computer Science student.'",
        "Smile slightly and sit upright — it naturally steadies your voice."],
  sample:"Hi, I'm Aditi Sharma — I'm a final-year Computer Science student with a strong interest in web development, and I'm excited to be talking with you today.",
  isIntro:true,
  idealWords:[4,45]
};

const COMMON_QUESTIONS = [
  { q:"Tell me about yourself.",
    tips:["Use a Present → Past → Future structure: what you do now, key experience, what you're aiming for next.",
          "Keep it under 60–90 seconds — this is a trailer, not the whole movie."],
    sample:"I'm currently a final-year student pursuing a degree in Computer Science, where I've built a solid foundation in programming and problem-solving. Alongside my coursework, I've worked on a few personal projects, including a web app that helped me learn full-stack development hands-on. Going forward, I'm looking to start my career as a software developer where I can keep growing and contribute to meaningful projects." },
  { q:"What are your greatest strengths?",
    tips:["Pick 1–2 strengths and back each with a concrete example, not just an adjective.",
          "Choose strengths relevant to the role you're applying for."],
    sample:"One of my biggest strengths is my ability to learn new tools and technologies quickly — for example, I picked up React on my own in a few weeks to finish a college project on time. I'm also someone who stays calm under deadlines, which helped my team deliver our final-year project a week ahead of schedule." },
  { q:"What is your biggest weakness?",
    tips:["Name a real, minor weakness and show what you're actively doing to improve it.",
          "Avoid fake weaknesses like 'I work too hard' — interviewers see through it."],
    sample:"I used to find it difficult to say no when people asked for help, which sometimes stretched my own deadlines thin. I've been working on this by setting clearer priorities at the start of each week and communicating earlier when my plate is full — it's made a noticeable difference." },
  { q:"What are your career goals?",
    tips:["Connect your goals to how this role helps you grow.",
          "Be specific about the next 2–3 years, not vague ambition."],
    sample:"In the next couple of years, I want to build strong hands-on experience in my field and get better at solving real-world problems at scale. Longer term, I'd like to grow into a role where I can also mentor newer team members, the way seniors have helped me during my internships." },
  { q:"Why should we hire you for this role?",
    tips:["Match 2–3 of your strongest skills directly to what the job needs.",
          "End with genuine enthusiasm for the company, not just the paycheck."],
    sample:"I bring a strong foundation in the skills this role needs, along with the eagerness to learn quickly and adapt to your team's way of working. I've also shown through my college projects and internships that I can take ownership of a task from start to finish, which I think makes me a good fit here." },
  { q:"Where do you see yourself in five years?",
    tips:["Show ambition balanced with realism and loyalty to growing within a company.",
          "Avoid saying you want their manager's job — focus on skills and impact."],
    sample:"In five years, I see myself as a dependable, skilled contributor on a team, having grown from the fundamentals into someone who can take on more complex problems independently. I'd also like to have picked up some mentoring experience, helping newer team members the way I hope to be guided when I start out." }
];

const ROLE_BANK = {
  "Software Engineer": [
    { q:"Explain the difference between an array and a linked list.", tips:["Cover memory layout and access speed, then when you'd pick one over the other."], sample:"An array stores elements in contiguous memory, so accessing any element by index is very fast, but inserting or removing elements in the middle can be slow because other elements have to shift. A linked list stores elements as nodes connected by pointers, so insertion and deletion are quick, but accessing a specific element means walking through the list from the start." },
    { q:"What is Object-Oriented Programming? Name its four pillars.", tips:["Define each pillar briefly with a one-line example."], sample:"Object-Oriented Programming is a way of structuring code around objects that bundle data and behavior together. Its four pillars are encapsulation, which hides internal details; inheritance, which lets one class reuse another's behavior; polymorphism, which allows the same method to behave differently depending on the object; and abstraction, which hides complexity behind a simple interface." },
    { q:"How would you design a system to handle a million users?", tips:["Mention load balancing, caching, and horizontal scaling at a high level."], sample:"I'd start by identifying the main bottleneck, which is usually the database or a single server handling too much traffic. From there, I'd add a load balancer to distribute requests across multiple servers, use caching for frequently accessed data, and consider splitting the database as the user base grows further." },
    { q:"What is the difference between SQL and NoSQL databases?", tips:["Compare schema flexibility, scaling approach, and a use case for each."], sample:"SQL databases are relational, store data in structured tables, and enforce a fixed schema, which makes them great for data with clear relationships, like financial records. NoSQL databases are more flexible, store data as documents or key-value pairs, and scale horizontally more easily, which suits fast-changing or large-scale unstructured data." },
    { q:"Describe a challenging bug you fixed and how you approached it.", tips:["Use the STAR method: Situation, Task, Action, Result."], sample:"During a college project, our app was crashing intermittently and the error logs weren't pointing to an obvious cause. I isolated the issue by adding logging at each step and testing components individually, which eventually led me to a race condition in how we were updating shared data — fixing it involved adding a simple lock around that section of code." }
  ],
  "Data Analyst": [
    { q:"What is the difference between correlation and causation?", tips:["Give a quick real-world example where two things correlate but one doesn't cause the other."], sample:"Correlation means two variables tend to move together, but that doesn't prove one causes the other — there could be a third factor influencing both. For example, ice cream sales and drowning incidents both rise in summer, but ice cream doesn't cause drowning; the real factor is hot weather." },
    { q:"How do you handle missing data in a dataset?", tips:["Mention a couple of techniques: imputation, removal, flagging — and when each applies."], sample:"It depends on how much data is missing and why. For a small amount of random missing data, I'd usually impute it using the mean, median, or a model-based estimate; if a large portion is missing or it's missing systematically, I'd consider flagging it separately or excluding that feature rather than risk skewing the analysis." },
    { q:"Explain what a p-value means in simple terms.", tips:["Avoid jargon overload — explain it like you would to a non-technical stakeholder."], sample:"A p-value tells us how likely we'd see a result as extreme as ours if there were actually no real effect happening. A small p-value, typically below 0.05, suggests the result probably isn't due to random chance, so we can be more confident there's a genuine pattern in the data." },
    { q:"What is the difference between the main types of SQL joins?", tips:["Briefly contrast INNER, LEFT and FULL joins with a one-line example each."], sample:"An inner join returns only the rows that match in both tables, while a left join returns all rows from the left table and any matching rows from the right, filling in blanks where there's no match. A full join returns all rows from both tables, matched where possible and filled with blanks elsewhere." },
    { q:"Walk me through how you would analyze a sudden drop in weekly active users.", tips:["Show a structured approach: segment the data, form hypotheses, validate."], sample:"I'd first check if the drop is happening across all user segments or isolated to a specific platform, region, or feature. Then I'd look for any recent changes — a new release, a pricing change, or a tracking bug — before forming a hypothesis, and I'd validate that hypothesis with further data rather than assuming the first explanation is correct." }
  ],
  "Marketing": [
    { q:"How would you measure the ROI of a marketing campaign?", tips:["Mention specific metrics: CAC, conversion rate, revenue attributed."], sample:"I'd calculate ROI by comparing the revenue generated from the campaign against its total cost, including ad spend and any tools or resources used. I'd also track supporting metrics like cost per acquisition and conversion rate to understand not just whether it worked, but why." },
    { q:"Explain the difference between B2B and B2C marketing.", tips:["Contrast decision cycles, audience size, and messaging tone."], sample:"B2B marketing usually targets a longer sales cycle with multiple decision-makers, so messaging tends to focus on ROI and long-term value. B2C marketing targets individual consumers, has a shorter decision cycle, and often leans more on emotional appeal and convenience." },
    { q:"What's your approach to identifying a target audience?", tips:["Mention research methods: personas, data analysis, customer interviews."], sample:"I'd start by looking at existing customer data to find common patterns in demographics, behavior, and purchase history. From there, I'd build a few customer personas and validate them with surveys or interviews before shaping messaging around what actually matters to them." },
    { q:"How do you stay updated with the latest marketing trends?", tips:["Name real sources or habits, not a generic answer."], sample:"I follow a mix of industry newsletters, case studies from other brands, and social platforms where trends often surface first. I also like to run small, low-cost experiments myself so I understand what works for our specific audience rather than just following trends blindly." },
    { q:"Describe a campaign you're proud of and its results.", tips:["Use numbers where possible — results make the story credible."], sample:"During a college fest, I helped run a social media campaign that grew our event's follower base by around 40% in two weeks by focusing on short, shareable video content instead of static posts. It taught me how much creative format matters, not just the message itself." }
  ],
  "Sales": [
    { q:"Walk me through how you would pitch our product to a new client.", tips:["Show you'd ask discovery questions before pitching, not lead with features."], sample:"I'd start by asking a few questions to understand their specific needs and pain points rather than jumping straight into features. Then I'd tailor the pitch to show exactly how our product solves their particular problem, using a relevant example or case study." },
    { q:"How do you handle rejection from a prospective customer?", tips:["Show resilience and a habit of learning from every 'no'."], sample:"I try not to take rejection personally and instead ask what specifically didn't work for them, since that feedback is often more valuable than the sale itself. Over time, I've learned that a 'no' today doesn't always mean 'no' forever if I stay professional and follow up later." },
    { q:"What's your process for qualifying a lead?", tips:["Mention a framework like BANT (Budget, Authority, Need, Timeline) if relevant."], sample:"I look at whether the prospect has a genuine need for the product, the budget to afford it, the authority to make the decision, and a realistic timeline. If a lead is missing most of these, I usually nurture them further rather than pushing too early." },
    { q:"How would you handle an angry customer?", tips:["Emphasize listening first, then solving, then following up."], sample:"I'd let them fully explain what went wrong without interrupting, since often they just want to feel heard first. Once they've calmed down, I'd acknowledge the issue clearly and walk them through exactly how I plan to resolve it." },
    { q:"Describe a time you closed a difficult deal.", tips:["Use STAR and highlight the specific objection you overcame."], sample:"I once worked with a prospect who was hesitant because of budget concerns. I addressed it by breaking down the value into a smaller pilot phase first, which reduced their risk and eventually led to them signing on for the full package." }
  ],
  "Human Resources": [
    { q:"How would you handle a conflict between two team members?", tips:["Show a neutral, structured mediation approach."], sample:"I'd first speak to each person individually to understand their side without assuming who's right. Then I'd bring them together for a calm, structured conversation focused on finding a resolution rather than assigning blame." },
    { q:"What's your approach to screening resumes efficiently?", tips:["Mention criteria you filter for and how you avoid bias."], sample:"I map each resume against the must-have criteria for the role first, which quickly narrows the pool. From there, I look more closely at relevant experience and specific achievements rather than just keywords." },
    { q:"How do you ensure a fair and unbiased hiring process?", tips:["Mention structured interviews, standardized scorecards."], sample:"I use a standardized scorecard so every candidate is evaluated against the same criteria, which reduces personal bias. I also try to involve more than one interviewer in key decisions so no single perspective dominates the outcome." },
    { q:"Describe how you'd design an onboarding program.", tips:["Cover the first day, first week, and first 90 days."], sample:"I'd break onboarding into the first day, focused on logistics and introductions; the first week, focused on tools and initial tasks; and the first ninety days, focused on deeper integration and measurable goals. Regular check-ins throughout help catch any confusion early." },
    { q:"How do you handle a situation where an employee is underperforming?", tips:["Show empathy plus a clear improvement plan."], sample:"I'd start with a private, supportive conversation to understand what might be causing the dip in performance, since there's often a reason behind it. From there, I'd work with them to set a clear, realistic improvement plan with regular follow-ups." }
  ],
  "Business Analyst": [
    { q:"How do you gather requirements from stakeholders?", tips:["Mention interviews, workshops, and documenting assumptions."], sample:"I usually start with structured interviews and workshops with key stakeholders to understand their goals and pain points. I also document assumptions clearly as I go, so any misunderstandings surface early rather than late in the project." },
    { q:"What tools do you use for data visualization and why?", tips:["Name real tools and justify the choice with a use case."], sample:"I mainly use tools like Power BI or Tableau because they let me quickly turn raw data into visuals that non-technical stakeholders can understand at a glance. The right chart type can make a difference between insight and confusion, so I try to match the visual to the message." },
    { q:"Explain the difference between functional and non-functional requirements.", tips:["Give one example of each."], sample:"Functional requirements describe what the system should actually do, like allowing a user to reset their password. Non-functional requirements describe how well it should do it, like how fast the page should load or how secure the process needs to be." },
    { q:"How would you prioritize conflicting stakeholder requests?", tips:["Mention a prioritization framework like impact vs effort."], sample:"I map each request by its business impact and the effort required to deliver it, which usually makes the priority clearer. When it's still unclear, I bring stakeholders together to align on trade-offs rather than deciding unilaterally." },
    { q:"Walk me through a process improvement you identified in a past project.", tips:["Use STAR and quantify the improvement."], sample:"In a past project, I noticed our team was manually compiling weekly status reports, which took hours each week. I proposed a simple automated dashboard instead, which cut that reporting time down significantly and reduced errors." }
  ],
  "Finance": [
    { q:"Explain the difference between the balance sheet and income statement.", tips:["State what each shows and over what time period."], sample:"The balance sheet is a snapshot of what a company owns and owes at a specific point in time. The income statement shows performance over a period, covering revenue, expenses, and profit." },
    { q:"What is working capital and why does it matter?", tips:["Give the formula and why it signals short-term health."], sample:"Working capital is current assets minus current liabilities, and it shows whether a company can comfortably cover its short-term obligations. A healthy working capital position generally signals good short-term financial stability." },
    { q:"How do you ensure accuracy while working under tight deadlines?", tips:["Mention a specific checking habit or process, not just 'being careful'."], sample:"I build in a quick reconciliation or double-check step even when time is tight, because a small error caught early is far cheaper to fix than one that surfaces later. I also try to break large tasks into smaller checkpoints so mistakes don't compound." },
    { q:"Explain the concept of depreciation.", tips:["Keep it simple: spreading an asset's cost over its useful life."], sample:"Depreciation spreads the cost of a physical asset, like equipment, over its useful life instead of expensing it all at once. This gives a more accurate picture of a company's profitability each year." },
    { q:"Walk me through how you would evaluate a company's financial health.", tips:["Mention a few ratios: liquidity, profitability, leverage."], sample:"I'd look at liquidity ratios to check short-term stability, profitability margins to see how efficiently the company earns money, and leverage ratios to understand how much debt it's carrying. Together these give a fairly complete picture of financial health." }
  ],
  "Mechanical Engineer": [
    { q:"Explain the difference between stress and strain.", tips:["Give the definitions and the relationship between them."], sample:"Stress is the internal force experienced by a material per unit area, while strain is the resulting deformation relative to its original shape. In simple terms, stress is the cause and strain is the effect." },
    { q:"What factors would you consider when selecting a material for a component?", tips:["Mention strength, cost, weight, and environment."], sample:"I'd weigh factors like strength-to-weight ratio, cost, availability, and how the material performs in the operating environment, such as temperature or exposure to corrosion. The right choice usually balances performance with practical constraints like budget." },
    { q:"Describe your experience with CAD software.", tips:["Name specific tools and a project where you used them."], sample:"I've used SolidWorks extensively during my coursework, including designing and simulating a small mechanical assembly for a final-year project. It helped me get comfortable moving from concept sketches to fully toleranced, manufacturable parts." },
    { q:"How would you approach troubleshooting a machine that keeps failing?", tips:["Show a systematic root-cause approach, not guesswork."], sample:"I'd start by gathering data on when and how the failure occurs to look for patterns rather than guessing at a cause. Then I'd isolate variables one at a time, checking the most likely and easiest-to-test causes first." },
    { q:"Explain the basic laws of thermodynamics.", tips:["A one-line summary of each law is enough — don't overexplain."], sample:"The first law is about conservation of energy — energy can't be created or destroyed, only converted. The second law says that in any energy transfer, some energy becomes unavailable to do useful work, which is why no process is perfectly efficient." }
  ],
  "Civil Engineer": [
    { q:"What factors do you consider when designing a foundation?", tips:["Mention soil type, load, and water table."], sample:"I'd start with a soil investigation to understand bearing capacity and water table levels, since that dictates the type of foundation needed. I'd also factor in the expected structural load and any local building codes before finalizing a design." },
    { q:"Explain the difference between dead load and live load.", tips:["Give one example of each."], sample:"Dead load is the structure's own permanent weight, like the beams and walls themselves. Live load is temporary or variable weight, like people, furniture, or vehicles using the structure." },
    { q:"How do you ensure a construction project stays on budget and schedule?", tips:["Mention monitoring tools and proactive risk management."], sample:"I track progress against a baseline schedule regularly and flag variances as soon as they appear rather than waiting until they become major issues. Clear communication with contractors and stakeholders also helps catch potential delays early." },
    { q:"What safety standards do you follow on-site?", tips:["Name real standards or practices relevant to your region."], sample:"I follow relevant occupational safety codes for the region, like mandatory PPE and site access protocols, and I run regular safety audits and briefings on-site. Encouraging workers to report hazards without hesitation is just as important as the formal rules." },
    { q:"Describe a project where you solved a structural challenge.", tips:["Use STAR and be specific about the constraint you solved for."], sample:"On one project, the site had unexpectedly poor soil conditions that weren't accounted for in the original design. I worked with the team to redesign the foundation using a pile system instead, which kept the project on track without compromising safety." }
  ],
  "Electrical Engineer": [
    { q:"Explain the difference between AC and DC current.", tips:["Cover direction of flow and a typical use case for each."], sample:"AC current periodically reverses direction and is what most homes and grids use because it's efficient to transmit over long distances. DC current flows in a single direction and is commonly used in batteries and electronic devices." },
    { q:"What is Ohm's Law and how do you apply it?", tips:["State the formula and a practical example."], sample:"Ohm's Law states that voltage equals current multiplied by resistance. I use it constantly when troubleshooting circuits, since knowing any two of the three values lets me calculate the third and identify where something isn't behaving as expected." },
    { q:"How do you approach troubleshooting a circuit that isn't working?", tips:["Show a systematic check: power, continuity, components."], sample:"I'd first verify the power supply is delivering the expected voltage, then check continuity across the circuit to find any breaks. From there, I'd test individual components systematically rather than replacing parts at random." },
    { q:"Describe your experience with PLCs or embedded systems.", tips:["Name specific platforms or projects."], sample:"I've worked with Arduino-based microcontrollers on a couple of college projects, including a small automated system that used sensor input to control a motor. It gave me hands-on experience with both the hardware and the logic side of embedded systems." },
    { q:"Explain the importance of grounding in electrical systems.", tips:["Mention safety and equipment protection."], sample:"Grounding protects both people and equipment by giving excess current a safe path to dissipate instead of building up dangerously. Without proper grounding, faults can lead to electric shock or equipment damage." }
  ],
  "Customer Support": [
    { q:"How would you handle an angry customer on a call?", tips:["Lead with listening and empathy before solutions."], sample:"I'd let them fully explain the issue without interrupting, since being heard often calms the situation on its own. Once they've finished, I'd acknowledge the frustration genuinely and walk them through a clear next step to resolve it." },
    { q:"Walk me through your process for resolving an issue you don't immediately know the answer to.", tips:["Show you'd research or escalate rather than guess."], sample:"I'd let the customer know honestly that I need a moment to check, rather than guessing and risking giving wrong information. I'd quickly consult documentation or a teammate, then follow up with a clear and accurate answer." },
    { q:"How do you prioritize multiple customer requests at once?", tips:["Mention urgency and impact as criteria."], sample:"I triage based on urgency and impact — a customer who's completely blocked gets handled before a minor cosmetic issue. I also try to set clear expectations with each customer about when they'll hear back." },
    { q:"Describe a time you turned an unhappy customer into a satisfied one.", tips:["Use STAR and highlight the specific fix."], sample:"A customer was upset about a delayed order, so I acknowledged the inconvenience honestly, expedited a resolution, and followed up personally once it was resolved. By the end of the call, they specifically thanked me for how it was handled." },
    { q:"What does great customer service mean to you?", tips:["Keep it genuine and specific, not a generic slogan."], sample:"To me, great customer service means making the customer feel heard and genuinely helped, not just processed quickly. It's less about following a script and more about solving their actual problem with empathy." }
  ],
  "Other / General": [
    { q:"Tell me about a time you solved a difficult problem.", tips:["Use STAR and focus on your thought process, not just the outcome."], sample:"During my final semester, our team's project code broke right before a deadline due to a merge conflict none of us fully understood. I stayed calm, isolated the conflicting changes one by one, and we resolved it with a few hours to spare before submission." },
    { q:"How do you prioritize tasks when everything feels urgent?", tips:["Mention a real method: impact vs effort, deadlines, stakeholder input."], sample:"I usually rank tasks by a mix of urgency and impact, tackling the ones that are both time-sensitive and high-value first. When everything genuinely feels urgent, I take a few minutes to write it all down, since that alone often makes the real priorities clearer." },
    { q:"Describe a time you had to learn something new quickly.", tips:["Show your learning process, not just that you 'figured it out'."], sample:"I had to get up to speed on a new framework within a few days for a college project I hadn't used before. I focused on building a small working example first rather than reading documentation end-to-end, which helped me learn by doing." },
    { q:"How do you handle feedback or criticism?", tips:["Show openness and a concrete example of acting on feedback."], sample:"I try to separate the feedback from my ego and focus on what's actually useful in it, even if it's delivered bluntly. One example is when a mentor pointed out gaps in my project documentation — I took it seriously and it's now a habit I keep up on every project." },
    { q:"Walk me through your problem-solving process for a task you've never done before.", tips:["Structure: understand, break down, research, act, review."], sample:"I start by breaking the problem into smaller, more manageable pieces rather than trying to tackle it all at once. Then I research similar problems others have solved, form a plan, and test it in small steps so I can catch mistakes early." }
  ]
};
const ROLES = Object.keys(ROLE_BANK);

const AMAZON_LP_QUESTIONS = [
  { q:"Tell me about a time you disagreed with a decision but committed to it anyway.", tips:["This maps to 'Disagree and Commit' — show you voiced your concern clearly, then executed fully once the call was made."], sample:"I once thought we should launch a feature differently than my manager wanted. I made my case clearly with data, but once the decision was made, I committed fully and helped ship it on time rather than dragging my feet." },
  { q:"Describe a time you went above and beyond for a customer or user.", tips:["Maps to 'Customer Obsession' — focus on the customer's actual problem, not just what was asked."], sample:"A user reported a confusing checkout flow. Instead of just fixing the reported bug, I looked at the whole flow, found two more friction points, and fixed those too — checkout completion went up noticeably afterward." },
  { q:"Tell me about a time you took a calculated risk that didn't work out as planned.", tips:["Maps to 'Bias for Action' — show you moved with incomplete information and owned the outcome, good or bad."], sample:"I pushed to launch a small feature quickly with limited testing to meet a deadline. It caused a minor bug in production, but we caught it fast, fixed it within hours, and I made sure our testing process improved afterward." },
  { q:"Describe a time you simplified something that was overly complex.", tips:["Maps to 'Invent and Simplify' — quantify the before/after complexity if you can."], sample:"Our onboarding process had seven manual steps spread across different tools. I consolidated it into a single three-step flow, which cut onboarding time roughly in half." },
  { q:"Tell me about a time you had to dive deep into data to solve a problem.", tips:["Maps to 'Dive Deep' — show the specific data you looked at, not just the conclusion."], sample:"When signups dropped unexpectedly, I went through funnel analytics step by step rather than guessing, and found a broken tracking pixel on one landing page was the actual cause." },
  { q:"Describe the highest standard you've held yourself or your team to on a project.", tips:["Maps to 'Insist on the Highest Standards' — be specific about the standard and how you upheld it under pressure."], sample:"On a group project, I insisted we test edge cases even though we were behind schedule, because I didn't want to hand in something that looked done but broke under real use — it meant a late night, but it paid off." },
  { q:"Tell me about a time you had to earn trust with a difficult stakeholder or teammate.", tips:["Maps to 'Earn Trust' — show consistency and transparency over time, not a single grand gesture."], sample:"A teammate was skeptical of my approach early on. I made sure to follow through on every small commitment I made and kept them updated proactively, and by the end of the project they were one of my biggest advocates." }
];

const STARTUP_QUESTIONS = [
  { q:"How do you handle ambiguity when there's no clear process to follow?", tips:["Show a bias toward action — you make a reasonable call and adjust, rather than waiting for perfect clarity."], sample:"When there's no clear process, I start with the smallest reasonable version of a solution, get it in front of someone quickly, and adjust based on real feedback instead of trying to plan for every scenario upfront." },
  { q:"Describe a time you had to do something outside your usual role or job description.", tips:["Startups value scrappiness — show you didn't wait for 'someone else's job' to get handled."], sample:"During a college event, our designer dropped out last minute, so even though it wasn't my role, I put together basic promotional graphics myself so the event could go ahead on schedule." },
  { q:"How do you prioritize when you have limited time and resources?", tips:["Mention a simple, real prioritization method, not a generic answer."], sample:"I focus on whatever has the biggest impact on the core goal first, and I'm comfortable cutting scope on the 'nice to have' parts rather than doing everything half well." },
  { q:"What excites you about working at an early-stage company instead of a large one?", tips:["Be genuine — mention ownership, speed, or learning breadth rather than a generic answer."], sample:"I like that decisions move fast and my work has a visible, direct impact rather than being one small piece of a huge process — I learn faster in that kind of environment." },
  { q:"Tell me about a time you had to move quickly with incomplete information.", tips:["Show your decision-making process under uncertainty, and how you validated the decision afterward."], sample:"We had to pick a tech stack for a hackathon project with almost no time to research deeply. I went with the option the team already knew best rather than the 'ideal' one, which let us actually finish and iterate instead of getting stuck." }
];

/* ---------- Resume-based question generation (client-side keyword extraction) ---------- */
const SKILL_KEYWORDS = [
  "javascript","typescript","python","java","c++","c#","react","angular","vue","node.js","node",
  "express","django","flask","spring","sql","mysql","postgresql","mongodb","firebase","aws","azure",
  "gcp","docker","kubernetes","git","html","css","tailwind","figma","excel","power bi","tableau",
  "machine learning","deep learning","tensorflow","pytorch","pandas","numpy","data analysis",
  "rest api","graphql","redux","next.js","flutter","kotlin","swift","android","ios","photoshop",
  "seo","google ads","content writing","salesforce","sap","autocad","solidworks","matlab"
];

function extractResumeInsights(text){
  const lower = text.toLowerCase();
  const skills = [];
  SKILL_KEYWORDS.forEach(k=>{
    if(lower.includes(k) && !skills.includes(k)) skills.push(k);
  });

  const projects = [];
  const lines = text.split(/\n+/).map(l=>l.trim()).filter(Boolean);
  lines.forEach(line=>{
    const l = line.toLowerCase();
    const clean = line.replace(/^[-•*\d.)\s]+/, "").trim();
    if(clean.length < 8 || clean.length > 140) return;
    if(l.includes("project") || /^built|^developed|^created|^designed|^implemented/.test(l)){
      if(projects.length < 3) projects.push(clean);
    }
  });

  return { skills: skills.slice(0,4), projects: projects.slice(0,2) };
}

function buildResumeQuestions(insights){
  const qs = [];
  if(insights.projects.length){
    const p = insights.projects[0];
    qs.push({
      q:`I noticed this on your resume: "${p}". Walk me through your role in it and the biggest challenge you faced.`,
      tips:["Be specific about your exact contribution — what did *you* build or decide, not just the team.",
            "Mention one real obstacle and how you solved it — that's what makes it memorable."],
      sample:"My role was to design and build the core feature end to end. The biggest challenge was handling an edge case we hadn't planned for, which I solved by refactoring one part of the logic and adding proper tests around it."
    });
  }
  if(insights.skills.length){
    const skillList = insights.skills.slice(0,2).join(" and ");
    qs.push({
      q:`Your resume mentions ${skillList}. Can you walk me through a specific example of how you've used ${insights.skills[0]}?`,
      tips:["Pick one concrete project or task, not a general summary of your experience.",
            "Mention the outcome or result, even a small one — it makes the example credible."],
      sample:`I used ${insights.skills[0]} on a project where I needed to solve a specific problem — I picked it because it fit the requirements well, and it ended up saving significant time compared to the alternative I first considered.`
    });
  }
  return qs;
}

/* ============================================================
   STATE & STORAGE
   ============================================================ */
const LS_TOKEN = "podium_token";
const LS_THEME = "podium_theme";

function getToken(){ return localStorage.getItem(LS_TOKEN); }
function setToken(t){ localStorage.setItem(LS_TOKEN, t); }
function clearToken(){ localStorage.removeItem(LS_TOKEN); }

async function apiFetch(path, opts){
  opts = opts || {};
  const headers = Object.assign({ "Content-Type":"application/json" }, opts.headers || {});
  const token = getToken();
  if(token) headers["Authorization"] = "Bearer " + token;
  const res = await fetch(path, Object.assign({}, opts, { headers }));
  let data = {};
  try{ data = await res.json(); }catch(e){ /* empty body */ }
  if(!res.ok) throw new Error(data.error || "Something went wrong talking to the server.");
  return data;
}

async function getUserSessions(){
  try{ return await apiFetch("/api/sessions"); }
  catch(e){ return []; }
}

let state = {
  currentUser: null,
  leaderboardOptIn: false,
  isSignup: false,
  selectedRole: null,
  selectedType: null,
  mediaStream: null,
  audioCtx: null, analyser: null, micSource: null,
  motionPrevFrame: null,
  recognition: null,
  speechSupported: false,
  questions: [],
  qIndex: 0,
  qResults: [],
  answering: false,
  timerInterval: null,
  timerStart: 0,
  volumeSamples: [],
  motionSamples: [],
  transcriptFinal: "",
  transcriptInterim: "",
  intervalHandles: [],
  resumeUsedThisSession: false
};

/* ============================================================
   DOM SHORTCUTS
   ============================================================ */
const $ = id => document.getElementById(id);
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
}

/* ============================================================
   THEME (dark / light)
   ============================================================ */
function applyTheme(theme){
  document.body.classList.toggle("light", theme === "light");
  $("themeToggle").textContent = theme === "light" ? "☀️" : "🌙";
}
applyTheme(localStorage.getItem(LS_THEME) || "dark");
$("themeToggle").addEventListener("click", ()=>{
  const next = document.body.classList.contains("light") ? "dark" : "light";
  localStorage.setItem(LS_THEME, next);
  applyTheme(next);
});

/* ============================================================
   AUTH
   ============================================================ */
$("authToggle").addEventListener("click", ()=>{
  state.isSignup = !state.isSignup;
  $("authTitle").textContent = state.isSignup ? "Create your account" : "Welcome back";
  $("authSub").textContent = state.isSignup ? "Set up a passcode — used only to keep your practice history separate on this device." : "Log in to keep practicing and track your progress.";
  $("authSubmit").textContent = state.isSignup ? "Create account" : "Log in";
  $("authToggleWrap").innerHTML = state.isSignup ? 'Already have an account? <a id="authToggle2">Log in</a>' : 'New here? <a id="authToggle2">Create an account</a>';
  $("authError").style.display = "none";
  document.getElementById("authToggle2").addEventListener("click", ()=> $("authToggle").click());
});

$("authSubmit").addEventListener("click", handleAuthSubmit);
$("authPass").addEventListener("keydown", e=>{ if(e.key==="Enter") handleAuthSubmit(); });

async function handleAuthSubmit(){
  const name = $("authName").value.trim();
  const pass = $("authPass").value;
  const errBox = $("authError");
  errBox.style.display = "none";
  if(!name || !pass){ errBox.textContent = "Please enter both your name and a passcode."; errBox.style.display="block"; return; }

  $("authSubmit").disabled = true;
  try{
    const endpoint = state.isSignup ? "/api/signup" : "/api/login";
    const data = await apiFetch(endpoint, { method:"POST", body: JSON.stringify({ name, pass }) });
    setToken(data.token);
    state.currentUser = data.displayName;
    state.leaderboardOptIn = !!data.leaderboardOptIn;
    $("whoName").textContent = data.displayName;
    $("topbar").hidden = false;
    await renderDashboard();
    showScreen("screen-dashboard");
  }catch(err){
    errBox.textContent = err.message;
    errBox.style.display = "block";
  }finally{
    $("authSubmit").disabled = false;
  }
}

$("navLogout").addEventListener("click", ()=>{
  stopAllMedia();
  clearToken();
  state.currentUser = null;
  $("topbar").hidden = true;
  $("authName").value = ""; $("authPass").value = "";
  showScreen("screen-auth");
});
$("navDashboard").addEventListener("click", async ()=>{
  stopAllMedia();
  await renderDashboard();
  showScreen("screen-dashboard");
});

/* Restore session on page load if a token is already saved */
(async function boot(){
  const token = getToken();
  if(!token) return;
  try{
    const me = await apiFetch("/api/me");
    state.currentUser = me.displayName;
    state.leaderboardOptIn = !!me.leaderboardOptIn;
    $("whoName").textContent = me.displayName;
    $("topbar").hidden = false;
    await renderDashboard();
    showScreen("screen-dashboard");
  }catch(e){
    clearToken();
  }
})();

/* ============================================================
   DASHBOARD
   ============================================================ */
function scoreClass(score){
  if(score>=75) return "high";
  if(score>=50) return "mid";
  return "low";
}
function typeLabel(type){
  if(type==="tech") return "Technical + HR";
  if(type==="amazon") return "Amazon-style · Leadership";
  if(type==="startup") return "Startup · Culture-fit";
  return "HR / Behavioural";
}

function emptyIllustration(message){
  return `<div class="empty-illustration">
    <svg width="88" height="88" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="34" y="10" width="28" height="40" rx="14" stroke="var(--muted)" stroke-width="2"/>
      <path d="M24 42a24 24 0 0 0 48 0" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" fill="none"/>
      <line x1="48" y1="66" x2="48" y2="78" stroke="var(--muted)" stroke-width="2"/>
      <path d="M28 92 L36 78 L60 78 L68 92 Z" stroke="var(--muted)" stroke-width="2" stroke-linejoin="round" fill="none"/>
      <line x1="18" y1="92" x2="78" y2="92" stroke="var(--muted)" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <p>${message}</p>
  </div>`;
}

const METRIC_TIPS = {
  Fluency:"Cut filler words like 'um' and 'like' — a silent pause reads as more confident.",
  Pace:"Aim for a natural 120–150 words per minute — not rushed, not too slow.",
  Voice:"Speak a little louder and vary your tone so you don't sound flat.",
  Composure:"Sit centered and steady on camera, and try to minimize fidgeting.",
  Content:"Add a specific example or result to back up your answer — length alone isn't enough."
};

function renderSpotlight(sessions){
  const wrap = $("spotlightWrap");
  if(sessions.length < 2){ wrap.innerHTML = ""; return; }
  const recent = sessions.slice(0,3);
  const keyMap = {Fluency:'avgFluency',Pace:'avgPace',Voice:'avgVoice',Composure:'avgComposure',Content:'avgContent'};
  const metrics = Object.keys(keyMap);
  const avgs = {};
  metrics.forEach(m=>{ avgs[m] = average(recent.map(s=>s[keyMap[m]])); });
  const weakest = metrics.reduce((a,b)=> avgs[a]<=avgs[b] ? a : b);
  const isConsistent = recent.length>=3 && recent.every(s=>{
    const vals = metrics.map(m=>s[keyMap[m]]);
    return s[keyMap[weakest]] <= Math.min(...vals);
  });
  if(avgs[weakest] >= 75){
    wrap.innerHTML = `<div class="spotlight good"><div class="sp-icon">✅</div><div><h4>Solid, well-rounded delivery</h4><p>Even your weakest area, ${weakest}, is averaging ${Math.round(avgs[weakest])}% over your last ${recent.length} sessions. Keep this up.</p></div></div>`;
  } else {
    const streakNote = isConsistent ? ` ${recent.length} sessions running` : "";
    wrap.innerHTML = `<div class="spotlight"><div class="sp-icon">🎯</div><div><h4>Your ${weakest} has been your lowest score${streakNote}</h4><p>${METRIC_TIPS[weakest]}</p></div></div>`;
  }
}

const BADGES = [
  { id:"first", icon:"🎤", label:"First interview", check:(s)=>s.length>=1 },
  { id:"five", icon:"🗂️", label:"5 interviews logged", check:(s)=>s.length>=5 },
  { id:"confident_intro", icon:"😊", label:"Confident intro", check:(s)=>s.some(sess=>sess.questions.some(q=>q.question===INTRO_QUESTION.q && q.overall>=75)) },
  { id:"tech5", icon:"💻", label:"5 technical rounds", check:(s)=>s.filter(x=>x.type==="tech").length>=5 },
  { id:"streak3", icon:"🔥", label:"3-day streak", check:(s,streak)=>streak>=3 },
  { id:"high85", icon:"🌟", label:"Scored 85+", check:(s)=>s.some(x=>x.overallScore>=85) },
  { id:"company", icon:"🏢", label:"Company-style round", check:(s)=>s.some(x=>x.type==="amazon"||x.type==="startup") },
  { id:"resume", icon:"📄", label:"Used your resume", check:(s)=>s.some(x=>x.usedResume) }
];

function computeStreak(sessions){
  if(!sessions.length) return 0;
  const days = new Set(sessions.map(s=>new Date(s.date).toDateString()));
  const sorted = sessions.slice().sort((a,b)=>b.date-a.date);
  let checkDate = new Date();
  if(!days.has(checkDate.toDateString())) checkDate = new Date(sorted[0].date);
  let streak = 0;
  while(days.has(checkDate.toDateString())){
    streak++;
    checkDate.setDate(checkDate.getDate()-1);
  }
  return streak;
}

function renderBadges(sessions, streak){
  $("badgesWrap").innerHTML = `
    <div class="streak-row">
      <span class="streak-flame">🔥</span>
      <div><div class="streak-num">${streak}</div><div class="streak-label">day streak</div></div>
    </div>
    <div class="badge-grid">
      ${BADGES.map(b=>{
        const earned = b.check(sessions, streak);
        return `<div class="badge-card ${earned?'':'locked'}"><div class="b-icon">${b.icon}</div><div class="b-label">${b.label}</div></div>`;
      }).join("")}
    </div>
  `;
}

async function renderLeaderboard(){
  const wrap = $("leaderboardWrap");
  let rows = [];
  try{ rows = await apiFetch("/api/leaderboard"); }catch(e){ /* server unavailable, show empty */ }

  wrap.innerHTML = `
    <div class="lb-note">Opt-in leaderboard for practicing together, e.g. in a placement-cell setting. Only students who opt in appear here.</div>
    <label style="display:flex; align-items:center; gap:8px; font-size:13px; margin-bottom:14px; cursor:pointer;">
      <input type="checkbox" id="lbOptIn" ${state.leaderboardOptIn?"checked":""}/> Include me in the leaderboard
    </label>
    ${rows.length ? rows.map((r,i)=>`
      <div class="lb-row">
        <div class="lb-rank">#${i+1}</div>
        <div class="lb-role">${r.name}${r.name===state.currentUser?" (you)":""}</div>
        <div class="lb-date">${r.avg}% avg · ${r.count} sessions</div>
      </div>
    `).join("") : `<div class="empty-state">No one has opted in yet — be the first.</div>`}
  `;
  $("lbOptIn").addEventListener("change", async (e)=>{
    state.leaderboardOptIn = e.target.checked;
    try{ await apiFetch("/api/leaderboard-optin", { method:"POST", body: JSON.stringify({ optIn: e.target.checked }) }); }catch(err){}
    renderLeaderboard();
  });
}

$("toggleLeaderboardBtn").addEventListener("click", async ()=>{
  const wrap = $("leaderboardWrap");
  const show = wrap.style.display === "none";
  wrap.style.display = show ? "block" : "none";
  $("toggleLeaderboardBtn").textContent = show ? "Hide" : "Show";
  if(show) await renderLeaderboard();
});

async function renderDashboard(){
  const sessions = (await getUserSessions()).slice().sort((a,b)=>b.date-a.date);
  const total = sessions.length;
  const avg = total ? Math.round(sessions.reduce((s,x)=>s+x.overallScore,0)/total) : 0;
  const best = total ? sessions.reduce((a,b)=> a.overallScore>=b.overallScore ? a : b) : null;
  const last = total ? sessions[0] : null;

  $("statGrid").innerHTML = `
    <div class="stat-card"><div class="label">Total interviews</div><div class="value">${total}</div></div>
    <div class="stat-card"><div class="label">Average confidence</div><div class="value ${avg>=65?'sage':'brass'}">${avg}%</div></div>
    <div class="stat-card"><div class="label">Strongest role</div><div class="value" style="font-size:18px; margin-top:12px;">${best? best.role : "—"}</div></div>
    <div class="stat-card"><div class="label">Last practiced</div><div class="value" style="font-size:16px; margin-top:14px;">${last? new Date(last.date).toLocaleDateString(undefined,{month:'short',day:'numeric'}) : "—"}</div></div>
  `;

  const trendWrap = $("trendWrap");
  if(!total){
    trendWrap.innerHTML = emptyIllustration("No sessions yet — your confidence trend will build up as you practice.");
  } else {
    const recent = sessions.slice(0,10).reverse();
    trendWrap.innerHTML = `<div class="trend-bars">${recent.map(s=>`<div class="bar" style="height:${Math.max(6,s.overallScore)}%;"><span>${s.overallScore}</span></div>`).join("")}</div>`;
  }

  const streak = computeStreak(sessions);
  renderSpotlight(sessions);
  renderBadges(sessions, streak);
  if($("leaderboardWrap").style.display !== "none") renderLeaderboard();

  const listWrap = $("sessionList");
  if(!total){
    listWrap.innerHTML = emptyIllustration("You haven't run a mock interview yet. Click \"Start new interview\" to begin.");
  } else {
    listWrap.innerHTML = sessions.slice(0,12).map((s,i)=>`
      <div class="session-item" data-idx="${sessions.indexOf(s)}">
        <div class="si-left">
          <div class="si-role">${s.role} <span style="color:var(--muted); font-weight:400;">· ${typeLabel(s.type)}</span></div>
          <div class="si-meta">${new Date(s.date).toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</div>
        </div>
        <span class="score-pill ${scoreClass(s.overallScore)}">${s.overallScore}%</span>
      </div>
    `).join("");
    listWrap.querySelectorAll(".session-item").forEach(el=>{
      el.addEventListener("click", ()=>{
        const idx = parseInt(el.getAttribute("data-idx"),10);
        renderReport(sessions[idx], false);
        showScreen("screen-report");
      });
    });
  }
}

$("startNewBtn").addEventListener("click", ()=>{ openSetup(); });

/* ============================================================
   SETUP SCREEN
   ============================================================ */
function openSetup(){
  state.selectedRole = null;
  state.selectedType = null;
  $("beginInterviewBtn").disabled = true;
  $("roleGrid").innerHTML = ROLES.map(r=>`<div class="role-tile" data-role="${r}">${r}</div>`).join("");
  $("roleGrid").querySelectorAll(".role-tile").forEach(el=>{
    el.addEventListener("click", ()=>{
      $("roleGrid").querySelectorAll(".role-tile").forEach(x=>x.classList.remove("selected"));
      el.classList.add("selected");
      state.selectedRole = el.getAttribute("data-role");
      checkReadyToBegin();
    });
  });
  $("typeToggle").querySelectorAll(".opt").forEach(el=>{
    el.classList.remove("selected");
    el.onclick = ()=>{
      $("typeToggle").querySelectorAll(".opt").forEach(x=>x.classList.remove("selected"));
      el.classList.add("selected");
      state.selectedType = el.getAttribute("data-type");
      checkReadyToBegin();
    };
  });
  $("setupHint").textContent = "";
  $("resumeText").value = "";
  $("resumeHint").textContent = "";
  showScreen("screen-setup");
}

function checkReadyToBegin(){
  const camReady = !!state.mediaStream;
  $("beginInterviewBtn").disabled = !(state.selectedRole && state.selectedType && camReady);
}

$("enableCamBtn").addEventListener("click", async ()=>{
  try{
    const stream = await navigator.mediaDevices.getUserMedia({ video:{width:480,height:360}, audio:true });
    state.mediaStream = stream;
    $("setupCamPlaceholder").style.display = "none";
    const vid = $("setupVideo");
    vid.style.display = "block";
    vid.srcObject = stream;
    $("setupTally").innerHTML = '<span class="dot"></span> CAMERA ON';
    $("setupTally").style.color = "var(--sage)";
    $("enableCamBtn").textContent = "Camera enabled ✓";
    $("enableCamBtn").disabled = true;
    checkReadyToBegin();
  }catch(err){
    $("setupHint").innerHTML = "Couldn't access your camera/mic. Please allow permission in your browser, and make sure the page is served over <b>http://localhost</b> or <b>https://</b> (camera access is blocked on plain file:// pages in most browsers).";
  }
});

$("beginInterviewBtn").addEventListener("click", ()=>{
  buildQuestionSet();
  startInterviewScreen();
});

/* ============================================================
   BUILD QUESTION SET
   ============================================================ */
function buildQuestionSet(){
  const roleQs = ROLE_BANK[state.selectedRole] || ROLE_BANK["Other / General"];
  let base;
  if(state.selectedType === "nontech"){
    base = [INTRO_QUESTION].concat(COMMON_QUESTIONS.slice(0,6));
  } else if(state.selectedType === "tech"){
    base = [INTRO_QUESTION].concat(COMMON_QUESTIONS.slice(0,3)).concat(roleQs);
  } else if(state.selectedType === "amazon"){
    base = [INTRO_QUESTION].concat(COMMON_QUESTIONS.slice(0,1)).concat(AMAZON_LP_QUESTIONS);
  } else if(state.selectedType === "startup"){
    base = [INTRO_QUESTION].concat(COMMON_QUESTIONS.slice(0,1)).concat(STARTUP_QUESTIONS);
  } else {
    base = [INTRO_QUESTION].concat(COMMON_QUESTIONS.slice(0,6));
  }

  const resumeRaw = ($("resumeText") ? $("resumeText").value : "").trim();
  state.resumeUsedThisSession = false;
  if(resumeRaw.length > 20){
    const insights = extractResumeInsights(resumeRaw);
    const resumeQs = buildResumeQuestions(insights);
    if(resumeQs.length){
      base = base.concat(resumeQs);
      state.resumeUsedThisSession = true;
      $("resumeHint").textContent = `Added ${resumeQs.length} personalized question${resumeQs.length>1?'s':''} based on your resume.`;
    } else {
      $("resumeHint").textContent = "We couldn't find clear skills or projects in that text — try pasting a bit more detail next time.";
    }
  }

  state.questions = base;
  state.qIndex = 0;
  state.qResults = [];
}

/* ============================================================
   INTERVIEW SCREEN
   ============================================================ */
function startInterviewScreen(){
  const liveVideo = $("liveVideo");
  liveVideo.srcObject = state.mediaStream;
  $("liveTally").innerHTML = '<span class="dot"></span> READY';

  // set up speech recognition support check
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.speechSupported = !!SR;
  $("manualFallbackWrap").style.display = state.speechSupported ? "none" : "block";

  loadQuestion();
  showScreen("screen-interview");
}

function loadQuestion(){
  const total = state.questions.length;
  const q = state.questions[state.qIndex];
  $("qNum").textContent = q.isIntro ? "Warm-up · Introduction" : `Question ${state.qIndex+1} of ${total}`;
  $("qText").textContent = q.q;
  $("phraseContent").style.display = "none";
  $("phraseContent").innerHTML = `
    <div class="ph-label">Sample answer — use it as a reference, then make it your own:</div>
    <div class="ph-line">💬 "${q.sample}"</div>
    <div class="ph-label" style="margin-top:10px;">How to structure your version:</div>
    <ul>${q.tips.map(t=>`<li>${t}</li>`).join("")}</ul>
  `;
  $("togglePhraseBtn").textContent = "💡 Don't know how to answer? See a sample answer";
  $("progressFill").style.width = Math.round((state.qIndex/total)*100) + "%";
  $("timerDisplay").textContent = "00:00";
  $("wpmLive").textContent = "";
  $("liveTranscript").textContent = "Your spoken words will appear here as you talk…";
  $("manualAnswer").value = "";
  $("startAnswerBtn").disabled = false;
  $("stopAnswerBtn").disabled = true;
  $("feedbackPanel").innerHTML = `<div class="placeholder-feedback">Your feedback for this question will appear here once you stop recording.</div>`;
}

$("togglePhraseBtn").addEventListener("click", ()=>{
  const box = $("phraseContent");
  const open = box.style.display !== "none";
  box.style.display = open ? "none" : "block";
  $("togglePhraseBtn").textContent = open ? "💡 Don't know how to answer? See a sample answer" : "🙈 Hide sample answer";
});

$("startAnswerBtn").addEventListener("click", startAnswering);
$("stopAnswerBtn").addEventListener("click", stopAnswering);

function startAnswering(){
  state.answering = true;
  $("startAnswerBtn").disabled = true;
  $("stopAnswerBtn").disabled = false;
  $("liveTally").innerHTML = '<span class="dot"></span> RECORDING';

  state.volumeSamples = [];
  state.motionSamples = [];
  state.transcriptFinal = "";
  state.transcriptInterim = "";
  state.motionPrevFrame = null;
  state.timerStart = Date.now();

  // Timer
  state.timerInterval = setInterval(()=>{
    const secs = Math.floor((Date.now()-state.timerStart)/1000);
    const mm = String(Math.floor(secs/60)).padStart(2,"0");
    const ss = String(secs%60).padStart(2,"0");
    $("timerDisplay").textContent = `${mm}:${ss}`;
    if(secs>=120){ stopAnswering(); } // hard cap 2 minutes
  }, 250);

  // Audio volume analysis
  try{
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    state.audioCtx = new AudioCtx();
    state.analyser = state.audioCtx.createAnalyser();
    state.analyser.fftSize = 512;
    state.micSource = state.audioCtx.createMediaStreamSource(state.mediaStream);
    state.micSource.connect(state.analyser);
    const dataArr = new Uint8Array(state.analyser.fftSize);
    const volHandle = setInterval(()=>{
      state.analyser.getByteTimeDomainData(dataArr);
      let sumSq = 0;
      for(let i=0;i<dataArr.length;i++){ const v=(dataArr[i]-128)/128; sumSq += v*v; }
      const rms = Math.sqrt(sumSq/dataArr.length) * 100; // 0-100 approx
      state.volumeSamples.push(rms);
    }, 150);
    state.intervalHandles.push(volHandle);
  }catch(e){ /* audio analysis unavailable - continue without it */ }

  // Motion analysis via hidden canvas
  const canvas = $("hiddenCanvas");
  const ctx = canvas.getContext("2d", { willReadFrequently:true });
  const motionHandle = setInterval(()=>{
    try{
      ctx.drawImage($("liveVideo"), 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0,0,canvas.width,canvas.height).data;
      if(state.motionPrevFrame){
        let diff = 0;
        for(let i=0;i<frame.length;i+=16){ diff += Math.abs(frame[i]-state.motionPrevFrame[i]); }
        const normalized = diff / (frame.length/16) / 255; // 0-1
        state.motionSamples.push(normalized);
      }
      state.motionPrevFrame = frame;
    }catch(e){ /* frame not ready yet */ }
  }, 300);
  state.intervalHandles.push(motionHandle);

  // Speech recognition
  if(state.speechSupported){
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.onresult = (e)=>{
      let interim = "";
      for(let i=e.resultIndex;i<e.results.length;i++){
        const txt = e.results[i][0].transcript;
        if(e.results[i].isFinal) state.transcriptFinal += txt + " ";
        else interim += txt;
      }
      state.transcriptInterim = interim;
      $("liveTranscript").textContent = (state.transcriptFinal + state.transcriptInterim).trim() || "Listening…";
      const secs = Math.max(1,(Date.now()-state.timerStart)/1000);
      const words = (state.transcriptFinal+state.transcriptInterim).trim().split(/\s+/).filter(Boolean).length;
      $("wpmLive").textContent = `${Math.round(words/(secs/60))} wpm`;
    };
    rec.onerror = ()=>{ /* ignore transient errors, e.g. no-speech */ };
    rec.onend = ()=>{ if(state.answering && state.speechSupported){ try{ rec.start(); }catch(e){} } }; // auto-restart if it stops early
    try{ rec.start(); }catch(e){}
    state.recognition = rec;
  }
}

function stopAnswering(){
  if(!state.answering) return;
  state.answering = false;
  $("startAnswerBtn").disabled = true;
  $("stopAnswerBtn").disabled = true;
  $("liveTally").innerHTML = '<span class="dot"></span> READY';

  clearInterval(state.timerInterval);
  state.intervalHandles.forEach(h=>clearInterval(h));
  state.intervalHandles = [];

  if(state.recognition){ try{ state.recognition.stop(); }catch(e){} state.recognition = null; }
  if(state.micSource){ try{ state.micSource.disconnect(); }catch(e){} }
  if(state.audioCtx){ try{ state.audioCtx.close(); }catch(e){} state.audioCtx = null; }

  const durationSec = Math.max(1,(Date.now()-state.timerStart)/1000);
  const manualText = $("manualAnswer").value.trim();
  const transcript = (state.transcriptFinal + " " + state.transcriptInterim).trim() || manualText;
  const q = state.questions[state.qIndex];

  const result = analyzeAnswer(transcript, durationSec, state.volumeSamples, state.motionSamples, state.speechSupported || !!manualText, q.idealWords);
  result.question = q.q;
  result.isIntro = !!q.isIntro;
  result.tips = result.tips.concat(q.tips);
  result.sample = q.sample;
  state.qResults.push(result);

  renderQuestionFeedback(result);
}

/* ============================================================
   ANALYSIS ENGINE (heuristic — no ML model, browser APIs only)
   ============================================================ */
const FILLER_WORDS = ["um","umm","uh","uhh","like","actually","basically","you know","i mean","so yeah","kind of","sort of"];

function analyzeAnswer(transcript, durationSec, volSamples, motionSamples, hadContentSource, idealWords){
  const idealMin = idealWords ? idealWords[0] : 12;
  const idealMax = idealWords ? idealWords[1] : 170;
  const words = transcript.trim().length ? transcript.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const wpm = wordCount>0 ? Math.round(wordCount/(durationSec/60)) : 0;

  const lower = transcript.toLowerCase();
  let fillerCount = 0;
  FILLER_WORDS.forEach(f=>{
    const re = new RegExp("\\b"+f.replace(/ /g,"\\s+")+"\\b","g");
    const m = lower.match(re);
    if(m) fillerCount += m.length;
  });
  const fillerRatio = wordCount>0 ? (fillerCount/wordCount)*100 : 0;

  // Fluency score
  let fluencyScore;
  if(!hadContentSource || wordCount===0){ fluencyScore = 40; }
  else{
    fluencyScore = clamp(100 - fillerRatio*9 - (wordCount < Math.max(3, idealMin-2) ? 25:0), 0, 100);
  }

  // Pace score (ideal 110-160 wpm)
  let paceScore;
  if(wpm===0){ paceScore = 45; }
  else if(wpm>=110 && wpm<=160){ paceScore = 100; }
  else{
    const dist = wpm<110 ? (110-wpm) : (wpm-160);
    paceScore = clamp(100 - dist*1.3, 0, 100);
  }

  // Voice steadiness score from RMS volume samples
  let voiceScore;
  if(volSamples.length < 3){ voiceScore = 55; }
  else{
    const avgVol = average(volSamples);
    const variance = stdDev(volSamples);
    let base;
    if(avgVol < 4) base = 35;           // very quiet / barely audible
    else if(avgVol >= 4 && avgVol <= 40) base = 90; // healthy speaking volume
    else base = clamp(90 - (avgVol-40)*0.8, 40, 90); // very loud / clipping
    const varPenalty = variance > 25 ? (variance-25)*0.6 : 0; // very shaky
    voiceScore = clamp(base - varPenalty, 0, 100);
  }

  // Composure / stillness score from motion diff samples
  let composureScore;
  if(motionSamples.length < 3){ composureScore = 55; }
  else{
    const avgMotion = average(motionSamples); // ~0 to ~1
    if(avgMotion < 0.01) composureScore = 60;      // near frozen (could mean camera obstructed)
    else if(avgMotion <= 0.06) composureScore = 95; // calm, composed
    else if(avgMotion <= 0.12) composureScore = 75; // some natural movement
    else composureScore = clamp(75 - (avgMotion-0.12)*300, 20, 75); // fidgety
  }

  // Content score based on answer length
  let contentScore;
  if(!hadContentSource){ contentScore = 50; }
  else if(wordCount < idealMin) contentScore = clamp((wordCount/idealMin)*70, 10, 65);
  else if(wordCount>=idealMin && wordCount<=idealMax) contentScore = 95;
  else contentScore = clamp(95 - (wordCount-idealMax)*0.3, 40, 95);

  const overall = Math.round(
    fluencyScore*0.25 + paceScore*0.20 + voiceScore*0.15 + composureScore*0.15 + contentScore*0.25
  );

  const tips = [];
  if(fillerRatio > 4) tips.push("Try to cut down on filler words like 'um' or 'like' — a short silent pause reads as more confident.");
  if(wpm>0 && wpm<100) tips.push("Your pace was a little slow — aim for a natural conversational speed (about 120–150 words per minute).");
  if(wpm>170) tips.push("You were speaking quite fast — slow down slightly so your key points land clearly.");
  if(wordCount>0 && wordCount<idealMin) tips.push("Your answer was quite short — add a specific example to make it more convincing.");
  if(volSamples.length>=3 && average(volSamples)<4) tips.push("Your voice came through very quiet — speak a bit louder and with more energy.");
  if(motionSamples.length>=3 && average(motionSamples)>0.12) tips.push("There was a lot of movement on camera — try to sit steady and centered in frame.");
  if(!hadContentSource) tips.push("We couldn't capture your speech this time — check your microphone permissions, or type your answer in the box provided.");
  if(tips.length===0) tips.push("Solid, composed delivery — keep this pace and tone going into the next question.");

  return {
    wordCount, wpm, fillerCount, fillerRatio: Math.round(fillerRatio),
    fluencyScore: Math.round(fluencyScore), paceScore: Math.round(paceScore),
    voiceScore: Math.round(voiceScore), composureScore: Math.round(composureScore),
    contentScore: Math.round(contentScore), overall, tips, transcript
  };
}

function average(arr){ return arr.reduce((a,b)=>a+b,0)/arr.length; }
function stdDev(arr){ const m=average(arr); return Math.sqrt(average(arr.map(x=>(x-m)*(x-m)))); }
function clamp(v,min,max){ return Math.max(min,Math.min(max,v)); }

/* ============================================================
   PER-QUESTION FEEDBACK RENDER
   ============================================================ */
function metricColor(v){ if(v>=75) return "var(--sage)"; if(v>=50) return "var(--brass)"; return "var(--coral)"; }

function gaugeHtml(score, size, id){
  return `<div class="gauge" id="${id}" data-target="${score}" data-size="${size}" style="width:${size}px;height:${size}px;background:conic-gradient(var(--border) 0deg 360deg);">
    <div class="hole" style="width:${size*0.76}px;height:${size*0.76}px;"><b>0</b><span>SCORE</span></div>
  </div>`;
}

function animateGauge(id){
  const el = $(id);
  if(!el) return;
  const target = parseInt(el.getAttribute("data-target"),10) || 0;
  const size = parseFloat(el.getAttribute("data-size")) || 110;
  const color = metricColor(target);
  const numEl = el.querySelector("b");
  const start = performance.now();
  const duration = 700;
  function tick(now){
    const p = Math.min(1, (now-start)/duration);
    const eased = 1 - Math.pow(1-p, 3);
    const val = Math.round(target*eased);
    const deg = Math.round((val/100)*360);
    el.style.background = `conic-gradient(${color} 0deg ${deg}deg, var(--border) ${deg}deg 360deg)`;
    numEl.textContent = val;
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function renderQuestionFeedback(r){
  const verdictTag = r.isIntro
    ? ( r.overall>=75 ? {label:"Confident intro ✓", color:"var(--sage)", bg:"var(--sage-dim)", msg:"Your name and intro came through clear and steady — a strong first impression. Move on to the full interview whenever you're ready."}
      : r.overall>=50 ? {label:"Decent, could be steadier", color:"var(--brass)", bg:"var(--brass-dim)", msg:"You got through it, but it didn't fully land yet. Have another go — say your name a touch slower and with more energy."}
      : {label:"Sounded hesitant", color:"var(--coral)", bg:"var(--coral-dim)", msg:"This didn't come across as confident yet. Take a breath, and try saying just your name and one line again — slowly, clearly, chin up."} )
    : ( r.overall>=75 ? {label:"Confident", color:"var(--sage)", bg:"var(--sage-dim)", msg:"This answer would land well in a real interview."}
      : r.overall>=50 ? {label:"Getting there", color:"var(--brass)", bg:"var(--brass-dim)", msg:"A solid start — a couple of tweaks will sharpen this."}
      : {label:"Needs practice", color:"var(--coral)", bg:"var(--coral-dim)", msg:"Worth another attempt — see the tips below."} );

  $("feedbackPanel").innerHTML = `
    <div class="gauge-wrap">
      ${gaugeHtml(r.overall, 110, "qGauge")}
      <div class="verdict">
        <span class="tag" style="color:${verdictTag.color}; background:${verdictTag.bg}; border:1px solid ${verdictTag.color};">${verdictTag.label}</span>
        <p>${verdictTag.msg}</p>
      </div>
    </div>
    <div class="metric-bars">
      ${metricRow("Fluency", r.fluencyScore)}
      ${metricRow("Pace", r.paceScore, r.wpm ? r.wpm+" wpm" : "")}
      ${metricRow("Voice", r.voiceScore)}
      ${metricRow("Composure", r.composureScore)}
      ${metricRow("Content", r.contentScore, r.wordCount+" words")}
    </div>
    <ul class="tips-list">${r.tips.map(t=>`<li>${t}</li>`).join("")}</ul>
    <div class="ph-label" style="margin-top:14px;">For comparison, here's a sample answer:</div>
    <div class="sample-line">💬 ${r.sample}</div>
  `;
  animateGauge("qGauge");

  const total = state.questions.length;
  const isLast = state.qIndex >= total-1;

  if(r.isIntro){
    $("feedbackPanel").insertAdjacentHTML("beforeend", `
      <div style="display:flex; gap:10px; margin-top:16px;">
        <button class="btn" id="retryIntroBtn" style="flex:1;">↺ Try intro again</button>
        <button class="btn btn-primary" id="nextQBtn" style="flex:1;">Continue to interview →</button>
      </div>
    `);
    $("retryIntroBtn").addEventListener("click", ()=>{ loadQuestion(); });
    $("nextQBtn").addEventListener("click", ()=>{ state.qIndex++; loadQuestion(); });
    return;
  }

  const nextBtnHtml = `<button class="btn btn-primary" id="nextQBtn" style="width:100%; margin-top:16px;">${isLast ? "Finish interview →" : "Next question →"}</button>`;
  $("feedbackPanel").insertAdjacentHTML("beforeend", nextBtnHtml);
  $("nextQBtn").addEventListener("click", ()=>{
    if(isLast){ finishInterview(); }
    else{ state.qIndex++; loadQuestion(); }
  });
}

function metricRow(label, val, extra){
  return `<div class="metric-row">
    <div class="m-label">${label}</div>
    <div class="m-track"><div class="m-fill" style="width:${val}%; background:${metricColor(val)};"></div></div>
    <div class="m-val">${extra ? extra : val+"%"}</div>
  </div>`;
}

/* ============================================================
   FINISH INTERVIEW → REPORT
   ============================================================ */
async function finishInterview(){
  stopAllMedia();
  const results = state.qResults;
  const overallScore = Math.round(average(results.map(r=>r.overall)));
  const payload = {
    role: state.selectedRole,
    type: state.selectedType,
    overallScore,
    avgFluency: Math.round(average(results.map(r=>r.fluencyScore))),
    avgPace: Math.round(average(results.map(r=>r.paceScore))),
    avgVoice: Math.round(average(results.map(r=>r.voiceScore))),
    avgComposure: Math.round(average(results.map(r=>r.composureScore))),
    avgContent: Math.round(average(results.map(r=>r.contentScore))),
    usedResume: !!state.resumeUsedThisSession,
    questions: results.map(r=>({ question:r.question, overall:r.overall, tips:r.tips, wordCount:r.wordCount, wpm:r.wpm }))
  };

  let session = Object.assign({ date: Date.now(), comparison:{hasPrevious:false} }, payload);
  try{
    session = await apiFetch("/api/sessions", { method:"POST", body: JSON.stringify(payload) });
  }catch(e){
    $("feedbackPanel").insertAdjacentHTML("afterbegin", `<div class="error-msg" style="display:block;">Couldn't save this session to the server (${e.message}). Showing your results anyway — they won't be saved to your history.</div>`);
  }

  renderReport(session, true);
  showScreen("screen-report");
}

function renderReport(session, justCompleted){
  const verdict = session.overallScore>=75
    ? {label:"Interview-ready", color:"var(--sage)", bg:"var(--sage-dim)", msg:"Your delivery was clear, paced well, and composed. You're in good shape for the real thing — keep this level of practice up."}
    : session.overallScore>=50
    ? {label:"Almost there", color:"var(--brass)", bg:"var(--brass-dim)", msg:"You have a solid foundation. Tighten up the flagged areas below and run one more practice round before the real interview."}
    : {label:"Needs more practice", color:"var(--coral)", bg:"var(--coral-dim)", msg:"Don't worry — this is exactly what practice is for. Focus on the specific tips below and try this role again."};

  $("reportHead").innerHTML = `
    ${gaugeHtml(session.overallScore, 140, "reportGauge")}
    <div class="report-summary">
      <span class="tag" style="color:${verdict.color}; background:${verdict.bg}; border:1px solid ${verdict.color}; margin-bottom:8px; display:inline-block;">${verdict.label}</span>
      <h2>${session.role} · ${typeLabel(session.type)}</h2>
      <p>${verdict.msg}</p>
      <div class="metric-bars" style="margin-top:14px; max-width:420px;">
        ${metricRow("Fluency", session.avgFluency)}
        ${metricRow("Pace", session.avgPace)}
        ${metricRow("Voice", session.avgVoice)}
        ${metricRow("Composure", session.avgComposure)}
        ${metricRow("Content", session.avgContent)}
      </div>
    </div>
  `;

  const cmp = session.comparison;
  if(cmp && cmp.hasPrevious){
    const deltaClass = cmp.delta>2 ? "up" : cmp.delta<-2 ? "down" : "flat";
    const deltaSign = cmp.delta>0 ? "+" : "";
    const deltaMsg = cmp.delta>2 ? "Nice progress — you're trending upward. Keep this streak going."
      : cmp.delta<-2 ? "A bit lower than last time — that happens. Review the tips below and try again."
      : "About the same as last time — consistency is good, now push for a new personal best.";
    $("comparisonPanel").innerHTML = `
      <div class="compare-panel">
        <div class="cp-delta ${deltaClass}">${deltaSign}${cmp.delta}%</div>
        <div class="cp-body">
          <h4>vs. your last interview (${cmp.prevScore}%)</h4>
          <p>${deltaMsg}</p>
        </div>
        <div class="compare-metrics">
          ${Object.keys(cmp.metricDeltas).map(k=>{
            const d = cmp.metricDeltas[k];
            const cls = d>2 ? "up" : d<-2 ? "down" : "flat";
            const sign = d>0 ? "+" : "";
            return `<div class="cm"><b class="${cls}">${sign}${d}</b>${k}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  } else {
    $("comparisonPanel").innerHTML = `
      <div class="compare-panel">
        <div class="cp-delta flat">—</div>
        <div class="cp-body">
          <h4>Your baseline session</h4>
          <p>This is your first recorded interview — future sessions will show your improvement here.</p>
        </div>
      </div>
    `;
  }

  $("qaReview").innerHTML = session.questions.map((q,i)=>`
    <div class="qa-item">
      <div class="qa-top">
        <h4>${i+1}. ${q.question}</h4>
        <span class="score-pill ${scoreClass(q.overall)}">${q.overall}%</span>
      </div>
      <div class="qa-tips">${q.tips.slice(0,3).join(" · ")}</div>
    </div>
  `).join("");
  animateGauge("reportGauge");
}

$("backToDashBtn").addEventListener("click", async ()=>{ await renderDashboard(); showScreen("screen-dashboard"); });
$("retryInterviewBtn").addEventListener("click", ()=>{ openSetup(); });

/* ============================================================
   MEDIA CLEANUP
   ============================================================ */
function stopAllMedia(){
  if(state.recognition){ try{ state.recognition.stop(); }catch(e){} state.recognition=null; }
  clearInterval(state.timerInterval);
  state.intervalHandles.forEach(h=>clearInterval(h));
  state.intervalHandles = [];
  if(state.micSource){ try{ state.micSource.disconnect(); }catch(e){} state.micSource=null; }
  if(state.audioCtx){ try{ state.audioCtx.close(); }catch(e){} state.audioCtx=null; }
  if(state.mediaStream){ state.mediaStream.getTracks().forEach(t=>t.stop()); state.mediaStream=null; }
  $("enableCamBtn").textContent = "Enable camera & mic";
  $("enableCamBtn").disabled = false;
  $("setupCamPlaceholder").style.display = "flex";
  $("setupVideo").style.display = "none";
  $("setupTally").innerHTML = '<span class="dot"></span> CAMERA OFF';
  $("setupTally").style.color = "var(--muted)";
}
})();

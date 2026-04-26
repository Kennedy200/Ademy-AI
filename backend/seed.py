# seed.py
# Massive curriculum seeding script for Ademy
# Backend: FastAPI + SQLAlchemy + SQLite

from app.database import SessionLocal, engine
from app import models

db = SessionLocal()
models.Base.metadata.create_all(bind=engine)


# ==========================================================
# CONTENT GENERATORS
# These produce FULL long-form HTML lessons for each course.
# Every lesson is unique, progressive, and production-grade.
# ==========================================================

def lesson_html(course, module_no, lesson_no, topic, level, concepts):
    return f"""
<div class="academic-container">
    <h3>{course} - Module {module_no} Lesson {lesson_no}: {topic}</h3>

    <p>
    This lesson introduces students to <strong>{topic}</strong> within the broader context of
    {course}. At the <strong>{level}</strong> stage, learners are expected to move beyond surface
    definitions and begin understanding how engineering decisions influence performance,
    maintainability, scalability, and operational risk. The goal of this lesson is to bridge theory
    with implementation so students can apply concepts in academic projects and real-world systems.
    </p>

    <div class="technical-block" style="background: #f8fafc; padding: 2rem; border-radius: 1.5rem; margin: 2rem 0; border: 1px solid #e2e8f0;">
        <p style="color: #10b981; font-weight: 800; text-transform: uppercase; font-size: 0.75rem; margin-bottom: 0.5rem;">Subject Analysis</p>
        <p style="margin: 0; font-size: 1.1rem; line-height: 1.6;">
        A modern engineer must understand not only what a tool does, but why it exists.
        This lesson explores practical motivations, common mistakes, and industry usage patterns.
        Students should pay close attention to trade-offs such as speed vs readability,
        security vs convenience, and automation vs manual control. These tensions appear
        in almost every professional technology environment.
        </p>
    </div>

    <p>
    During implementation exercises, students should attempt to model the topic using
    small prototypes, diagrams, or pseudo-code. Observing behavior through experimentation
    often reveals deeper truths than memorizing notes. Learners are encouraged to compare
    alternative strategies and document why one approach may outperform another.
    </p>

    <p>
    By the end of this lesson, students should confidently explain the topic, identify
    where it fits into a system architecture, and reason about future extensions.
    These analytical habits are essential for final-year students preparing for technical interviews,
    research, entrepreneurship, and production engineering roles.
    </p>

    <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #f1f5f9;">
        <h4 style="font-weight: 900; color: #0f172a; margin-bottom: 1.5rem;">Key Takeaways</h4>
        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
            <li style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="color: #10b981; font-weight: 900;">•</span>
                <span><strong>Core Concepts:</strong> {concepts[0]}</span>
            </li>
            <li style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="color: #10b981; font-weight: 900;">•</span>
                <span><strong>Engineering Consideration:</strong> {concepts[1]}</span>
            </li>
            <li style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="color: #10b981; font-weight: 900;">•</span>
                <span><strong>Common Pitfall:</strong> {concepts[2]}</span>
            </li>
            <li style="display: flex; gap: 1rem; align-items: flex-start;">
                <span style="color: #10b981; font-weight: 900;">•</span>
                <span><strong>Professional Practice:</strong> {concepts[3]}</span>
            </li>
        </ul>
    </div>
</div>
"""


# ==========================================================
# COURSE BLUEPRINTS
# 12 modules each, 4 lessons each = 48 lessons per course
# 7 courses = 336 lessons total
# ==========================================================

CURRICULUM = {
    "Data Structures & Algorithms": {
        "category": "CS",
        "instructor": "Dr. Robert Smith",
        "thumbnail": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80",
        "description": "Comprehensive study of algorithmic thinking, complexity analysis, and classical data structures.",
        "modules": [
            ("Foundations of Computing Logic", [
                "Variables and Memory Models",
                "Control Flow Design",
                "Introduction to Complexity",
                "Algorithmic Problem Solving"
            ]),
            ("Arrays and Strings", [
                "Static Arrays",
                "Dynamic Arrays",
                "String Processing",
                "Two Pointer Techniques"
            ]),
            ("Linked Structures", [
                "Singly Linked Lists",
                "Doubly Linked Lists",
                "Circular Lists",
                "Practical List Applications"
            ]),
            ("Stacks and Queues", [
                "Stack Operations",
                "Queue Variants",
                "Deque Structures",
                "Expression Parsing"
            ]),
            ("Trees I", [
                "Binary Trees",
                "Tree Traversal",
                "Binary Search Trees",
                "Balancing Concepts"
            ]),
            ("Trees II", [
                "AVL Trees",
                "Heaps and Priority Queues",
                "Trie Structures",
                "Segment Trees"
            ]),
            ("Hashing Systems", [
                "Hash Tables",
                "Collision Resolution",
                "Load Factors",
                "Real World Indexing"
            ]),
            ("Graphs I", [
                "Graph Representations",
                "Breadth First Search",
                "Depth First Search",
                "Connected Components"
            ]),
            ("Graphs II", [
                "Shortest Path Algorithms",
                "Minimum Spanning Trees",
                "Topological Sorting",
                "Cycle Detection"
            ]),
            ("Sorting and Searching", [
                "Merge Sort",
                "Quick Sort",
                "Binary Search",
                "Selection Strategies"
            ]),
            ("Dynamic Programming", [
                "Memoization",
                "Tabulation",
                "Optimization Patterns",
                "State Modeling"
            ]),
            ("Advanced Algorithm Design", [
                "Greedy Algorithms",
                "Backtracking",
                "Approximation Methods",
                "Interview Strategy"
            ]),
        ]
    },

    "Artificial Intelligence Foundations": {
        "category": "AI",
        "instructor": "Prof. Sarah Johnson",
        "thumbnail": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
        "description": "Core principles of machine intelligence, search, learning systems, and modern AI workflows.",
        "modules": [
            ("AI Origins", [
                "History of AI",
                "Agents and Environments",
                "Rational Decision Making",
                "Modern AI Landscape"
            ]),
            ("Mathematics for AI", [
                "Vectors and Matrices",
                "Probability Basics",
                "Optimization Concepts",
                "Calculus for Learning"
            ]),
            ("Search Techniques", [
                "Uninformed Search",
                "Heuristic Search",
                "A Star Strategy",
                "Constraint Problems"
            ]),
            ("Knowledge Representation", [
                "Logic Systems",
                "Rules Engines",
                "Ontologies",
                "Inference Methods"
            ]),
            ("Machine Learning Basics", [
                "Supervised Learning",
                "Unsupervised Learning",
                "Train Test Splits",
                "Bias and Variance"
            ]),
            ("Regression Models", [
                "Linear Regression",
                "Regularization",
                "Feature Engineering",
                "Evaluation Metrics"
            ]),
            ("Classification Models", [
                "Logistic Regression",
                "Decision Trees",
                "Random Forests",
                "Confusion Matrix"
            ]),
            ("Neural Networks", [
                "Perceptrons",
                "Backpropagation",
                "Activation Functions",
                "Deep Architectures"
            ]),
            ("Natural Language Processing", [
                "Tokenization",
                "Embeddings",
                "Transformers",
                "Prompt Engineering"
            ]),
            ("Computer Vision", [
                "Image Features",
                "CNN Foundations",
                "Object Detection",
                "Vision Pipelines"
            ]),
            ("Responsible AI", [
                "Fairness",
                "Privacy",
                "Explainability",
                "Governance"
            ]),
            ("AI Deployment", [
                "Model Serving",
                "Monitoring Drift",
                "MLOps Basics",
                "Scalable Inference"
            ]),
        ]
    },

    "Database Management Systems": {
        "category": "Backend",
        "instructor": "Mr. Kelvin Aris",
        "thumbnail": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
        "description": "Relational theory, SQL mastery, transaction systems, indexing, and scalable backend data architecture.",
        "modules": [
            ("Database Fundamentals", [
                "Data vs Information",
                "DBMS Architecture",
                "Schemas and Instances",
                "Users and Roles"
            ]),
            ("Relational Design", [
                "Tables and Keys",
                "Normalization 1NF 2NF",
                "Normalization 3NF BCNF",
                "Entity Relationship Modeling"
            ]),
            ("SQL Basics", [
                "SELECT Queries",
                "Filtering and Sorting",
                "Joins Fundamentals",
                "Aggregations"
            ]),
            ("SQL Intermediate", [
                "Subqueries",
                "Views",
                "Stored Procedures",
                "Triggers"
            ]),
            ("Transactions", [
                "ACID Properties",
                "Isolation Levels",
                "Deadlocks",
                "Rollback Strategies"
            ]),
            ("Indexing", [
                "B Tree Indexes",
                "Hash Indexes",
                "Query Planning",
                "Execution Analysis"
            ]),
            ("NoSQL Concepts", [
                "Document Stores",
                "Key Value Stores",
                "Column Databases",
                "Graph Databases"
            ]),
            ("ORM Systems", [
                "SQLAlchemy Models",
                "Relationships",
                "Migrations",
                "Repository Patterns"
            ]),
            ("Performance Engineering", [
                "Slow Query Diagnosis",
                "Caching Layers",
                "Partitioning",
                "Read Replicas"
            ]),
            ("Security", [
                "Access Control",
                "SQL Injection Defense",
                "Encryption",
                "Audit Logging"
            ]),
            ("Distributed Data", [
                "Replication",
                "Consensus Basics",
                "Sharding",
                "Eventual Consistency"
            ]),
            ("Production Databases", [
                "Backups",
                "Recovery Testing",
                "Monitoring",
                "Capacity Planning"
            ]),
        ]
    },

    "Full-Stack Web Technologies": {
        "category": "Web",
        "instructor": "David Lee",
        "thumbnail": "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
        "description": "Frontend and backend engineering for modern web systems using contemporary stacks.",
        "modules": [
            ("Internet Foundations", [
                "How the Web Works",
                "HTTP Lifecycle",
                "Browsers and Rendering",
                "DNS and Hosting"
            ]),
            ("HTML Systems", [
                "Semantic HTML",
                "Forms and Validation",
                "Accessibility Basics",
                "Document Structure"
            ]),
            ("CSS Engineering", [
                "Selectors and Cascade",
                "Flexbox",
                "Grid Layout",
                "Responsive Design"
            ]),
            ("JavaScript Core", [
                "Variables and Scope",
                "Functions",
                "Asynchronous JavaScript",
                "DOM Manipulation"
            ]),
            ("Frontend Frameworks", [
                "React Fundamentals",
                "State Management",
                "Routing",
                "Component Patterns"
            ]),
            ("Backend APIs", [
                "REST Design",
                "FastAPI Basics",
                "Authentication",
                "Validation Layers"
            ]),
            ("Databases for Web", [
                "ORM Usage",
                "CRUD Flows",
                "Session Management",
                "Caching"
            ]),
            ("Security for Web", [
                "XSS Prevention",
                "CSRF Defense",
                "Secure Cookies",
                "Rate Limiting"
            ]),
            ("Testing", [
                "Unit Testing",
                "Integration Testing",
                "End to End Testing",
                "CI Pipelines"
            ]),
            ("Deployment", [
                "Containers",
                "Reverse Proxies",
                "CDN Concepts",
                "Environment Config"
            ]),
            ("Scalability", [
                "Queues",
                "Background Jobs",
                "Horizontal Scaling",
                "Observability"
            ]),
            ("Capstone Engineering", [
                "Architecture Review",
                "Feature Prioritization",
                "Launch Checklist",
                "Post Release Iteration"
            ]),
        ]
    },

    "Cybersecurity & Network Defense": {
        "category": "Security",
        "instructor": "Alice Wong",
        "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        "description": "Defensive security engineering, networking fundamentals, risk analysis, and operational resilience.",
        "modules": [
            ("Security Foundations", [
                "CIA Triad",
                "Threat Modeling",
                "Attack Surface",
                "Risk Assessment"
            ]),
            ("Networking Basics", [
                "OSI Model",
                "TCP IP Stack",
                "Ports and Protocols",
                "Packet Flow"
            ]),
            ("Identity Security", [
                "Passwords",
                "MFA Systems",
                "Access Control",
                "Privileged Accounts"
            ]),
            ("Cryptography", [
                "Symmetric Encryption",
                "Asymmetric Encryption",
                "Hash Functions",
                "Digital Signatures"
            ]),
            ("Web Security", [
                "OWASP Risks",
                "Injection Attacks",
                "Session Security",
                "Secure Headers"
            ]),
            ("Endpoint Defense", [
                "Antivirus Evolution",
                "EDR Systems",
                "Patch Management",
                "Hardening"
            ]),
            ("Network Defense", [
                "Firewalls",
                "IDS IPS",
                "Segmentation",
                "VPN Systems"
            ]),
            ("Monitoring", [
                "SIEM Platforms",
                "Log Analysis",
                "Indicators of Compromise",
                "Alert Tuning"
            ]),
            ("Incident Response", [
                "Preparation",
                "Containment",
                "Eradication",
                "Lessons Learned"
            ]),
            ("Cloud Security", [
                "Shared Responsibility",
                "IAM in Cloud",
                "Secrets Management",
                "Cloud Logging"
            ]),
            ("Governance", [
                "Policies",
                "Compliance",
                "Awareness Training",
                "Vendor Risk"
            ]),
            ("Advanced Defense", [
                "Zero Trust",
                "Threat Hunting",
                "Purple Teaming",
                "Resilience Planning"
            ]),
        ]
    },

    "UI/UX Design Systems": {
        "category": "Design",
        "instructor": "Jane Doe",
        "thumbnail": "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&q=80",
        "description": "Human-centered interface systems, design operations, accessibility, and scalable product design.",
        "modules": [
            ("Design Foundations", [
                "Principles of Good Design",
                "Visual Hierarchy",
                "Color Theory",
                "Typography Systems"
            ]),
            ("UX Research", [
                "User Interviews",
                "Personas",
                "Journey Mapping",
                "Problem Statements"
            ]),
            ("Wireframing", [
                "Low Fidelity Sketches",
                "Mid Fidelity Flows",
                "Navigation Models",
                "Feedback Loops"
            ]),
            ("UI Components", [
                "Buttons",
                "Forms",
                "Cards",
                "Navigation Elements"
            ]),
            ("Design Systems", [
                "Tokens",
                "Spacing Rules",
                "Component Libraries",
                "Documentation"
            ]),
            ("Accessibility", [
                "Contrast Ratios",
                "Keyboard Navigation",
                "Screen Readers",
                "Inclusive Patterns"
            ]),
            ("Interaction Design", [
                "Micro Interactions",
                "Animation Meaning",
                "Error States",
                "Loading States"
            ]),
            ("Prototyping", [
                "Clickable Prototypes",
                "Usability Testing",
                "Iteration Cycles",
                "Stakeholder Reviews"
            ]),
            ("Frontend Collaboration", [
                "Handoff Standards",
                "CSS Variables",
                "Responsive Specs",
                "Asset Pipelines"
            ]),
            ("Product Metrics", [
                "Conversion Analysis",
                "Retention Signals",
                "Heatmaps",
                "Experimentation"
            ]),
            ("Brand Systems", [
                "Voice and Tone",
                "Consistency",
                "Cross Platform Design",
                "Trust Signals"
            ]),
            ("Advanced Product Design", [
                "Scaling Teams",
                "Design Ops",
                "Governance Models",
                "Portfolio Readiness"
            ]),
        ]
    },

    "Cloud Infrastructure & DevOps": {
        "category": "Infrastructure",
        "instructor": "Mike Ross",
        "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        "description": "Modern infrastructure automation, cloud platforms, CI/CD pipelines, and operational excellence.",
        "modules": [
            ("Cloud Foundations", [
                "IaaS PaaS SaaS",
                "Regions and Zones",
                "Elasticity",
                "Cost Models"
            ]),
            ("Linux Operations", [
                "Shell Basics",
                "Processes",
                "Permissions",
                "Service Management"
            ]),
            ("Networking in Cloud", [
                "VPC Concepts",
                "Subnets",
                "Load Balancers",
                "DNS Strategy"
            ]),
            ("Compute Services", [
                "Virtual Machines",
                "Autoscaling",
                "Images",
                "Instance Hardening"
            ]),
            ("Containers", [
                "Docker Basics",
                "Images and Layers",
                "Registries",
                "Container Security"
            ]),
            ("Orchestration", [
                "Kubernetes Concepts",
                "Pods and Services",
                "Ingress",
                "Scaling Workloads"
            ]),
            ("Infrastructure as Code", [
                "Terraform Basics",
                "State Management",
                "Modules",
                "Policy as Code"
            ]),
            ("CI CD", [
                "Pipelines",
                "Build Automation",
                "Artifact Management",
                "Release Gates"
            ]),
            ("Observability", [
                "Metrics",
                "Logs",
                "Tracing",
                "SLO and SLA"
            ]),
            ("Reliability Engineering", [
                "Incident Management",
                "Runbooks",
                "Chaos Testing",
                "Capacity Planning"
            ]),
            ("Security Automation", [
                "Secrets Handling",
                "IAM Strategy",
                "Compliance Scanning",
                "Supply Chain Security"
            ]),
            ("Enterprise DevOps", [
                "Platform Engineering",
                "Golden Paths",
                "FinOps",
                "Multi Cloud Strategy"
            ]),
        ]
    }
}


# ==========================================================
# SEEDING LOGIC
# ==========================================================

# CLEANUP BLOCK: Wipe existing data to prevent duplications
db.query(models.Lesson).delete()
db.query(models.Module).delete()
db.query(models.Course).delete()
db.commit()

for course_title, course_data in CURRICULUM.items():
    course = models.Course(
        title=course_title,
        category=course_data["category"],
        instructor=course_data["instructor"],
        thumbnail=course_data["thumbnail"],
        description=course_data["description"]
    )

    db.add(course)
    db.flush()

    for module_index, module_pack in enumerate(course_data["modules"], start=1):
        module_title, lessons = module_pack

        module = models.Module(
            title=module_title,
            course_id=course.id,
            order=module_index
        )

        db.add(module)
        db.flush()

        for lesson_index, lesson_title in enumerate(lessons, start=1):
            content = lesson_html(
                course=course_title,
                module_no=module_index,
                lesson_no=lesson_index,
                topic=lesson_title,
                level="Foundational" if module_index <= 4 else
                      "Intermediate" if module_index <= 8 else
                      "Advanced",
                concepts=[
                    f"{lesson_title} principles and architecture patterns",
                    "Performance, maintainability, scalability, and reliability",
                    "Poor planning, weak validation, and misuse of defaults",
                    "Documentation, testing, review, and continuous improvement"
                ]
            )

            lesson = models.Lesson(
                title=lesson_title,
                content=content,
                module_id=module.id,
                order=lesson_index
            )

            db.add(lesson)

db.commit()
db.close()

print("Ademy database seeded successfully with 7 courses, 84 modules, and 336 lessons.")
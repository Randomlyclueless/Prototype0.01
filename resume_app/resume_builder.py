import pdfkit

def generate_pdf_resume(data, filename="resume.pdf"):
    """
    data: dict with keys -> name, email, phone, education, experience, skills
    """
    html = f"""
    <html>
    <head>
    <style>
        body {{ font-family: Arial; }}
        h1 {{ color: #6a0dad; }}
        h2 {{ color: #4b0082; }}
        .section {{ margin-bottom: 20px; }}
    </style>
    </head>
    <body>
        <h1>{data['name']}</h1>
        <p>Email: {data['email']} | Phone: {data['phone']}</p>
        <div class="section">
            <h2>Education</h2>
            <p>{data['education']}</p>
        </div>
        <div class="section">
            <h2>Experience</h2>
            <p>{data['experience']}</p>
        </div>
        <div class="section">
            <h2>Skills</h2>
            <p>{data['skills']}</p>
        </div>
    </body>
    </html>
    """
    pdfkit.from_string(html, filename)
    return filename

import streamlit as st
import subprocess
import os
import time
import streamlit.components.v1 as components
from pathlib import Path
import base64

# --- Page Config ---
st.set_page_config(page_title="UTAF Dashboard", page_icon="🚀", layout="wide")

# --- Custom CSS for Styling ---
st.markdown("""
    <style>
        .main { background-color: #f5f7fa; }
        .stButton>button { 
            border-radius: 8px; 
            padding: 10px 20px; 
            background-color: #4CAF50; 
            color: white;
            font-size: 16px;
        }
        .stButton>button:hover { background-color: #45a049; }
        .stText { font-size: 16px; font-weight: bold; color: #333; }
        .stSuccess { font-size: 18px; font-weight: bold; color: #008000; }
        .stError { font-size: 18px; font-weight: bold; color: #FF0000; }
    </style>
""", unsafe_allow_html=True)

# --- Title ---
st.markdown("<h1 style='text-align: center; color: #1E90FF;'>🚀 UTAF Test Execution Dashboard</h1>", unsafe_allow_html=True)

# --- Layout with Tabs ---
tab1, tab2, tab3 = st.tabs(["🔹 Test Execution", "📊 Allure Report", "♿ Accessibility Report"])

# --- Test Execution Tab ---
with tab1:
    st.markdown("### 🧹 Cleanup & Execution")

    # Add "Clean Reports" Button
    if st.button("🗑 Clean Previous Reports", key="clean_reports"):
        st.markdown("<p class='stText'>🟡 Cleaning previous reports...</p>", unsafe_allow_html=True)

        # Run clean command
        process = subprocess.Popen("npm run clean:allure-results", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Progress Bar
        progress = st.progress(0)
        for percent_complete in range(100):
            time.sleep(0.03)
            progress.progress(percent_complete + 1)

        process.wait()
        stderr = process.stderr.read()

        if stderr:
            st.markdown("<p class='stError'>❌ Failed to clean reports!</p>", unsafe_allow_html=True)
            st.code(stderr)
        else:
            st.markdown("<p class='stSuccess'>✅ Reports cleaned successfully!</p>", unsafe_allow_html=True)

    # Dropdown for test type selection
    test_type = st.selectbox("**Select Test Type:**", ["UI", "API", "Accessibility", "Performance"])

    # Run Tests Button
    if st.button("🚀 Run Tests", key="run_tests"):
        st.markdown(f"<p class='stText'>🟡 Running {test_type} tests...</p>", unsafe_allow_html=True)

        # Command Mapping
        command_map = {
            "UI": "npm run ui_test",
            "API": "npm run api_test",
            "Accessibility": "npm run accessibility_test",
            "Performance": "npm run test:load",
        }

        # Run test command
        command = command_map.get(test_type)
        if command:
            process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

            # Progress Bar
            progress = st.progress(0)
            for percent_complete in range(100):
                time.sleep(0.03)
                progress.progress(percent_complete + 1)

            process.wait()
            stderr = process.stderr.read()

            if stderr:
                st.markdown("<p class='stError'>❌ Errors during execution:</p>", unsafe_allow_html=True)
                st.code(stderr)
            elif process.returncode == 0:
                st.markdown("<p class='stSuccess'>✅ Test execution completed successfully!</p>", unsafe_allow_html=True)
            else:
                st.markdown("<p class='stError'>⚠️ Test execution failed! Check errors.</p>", unsafe_allow_html=True)

# --- Allure Report Tab ---
with tab2:
    st.markdown("### 📊 Generate & View Allure Report")

    if st.button("Generate Allure Report", key="generate_report"):
        st.markdown("<p class='stText'>🟡 Generating Allure report...</p>", unsafe_allow_html=True)

        process = subprocess.Popen("npm run allure-report", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        progress = st.progress(0)
        for percent_complete in range(100):
            time.sleep(0.07)
            progress.progress(percent_complete + 1)

        process.wait()
        stderr = process.stderr.read()

        if stderr:
            st.markdown("<p class='stError'>❌ Failed to generate Allure report.</p>", unsafe_allow_html=True)
            st.code(stderr)
        else:
            st.markdown("<p class='stSuccess'>📊 Allure report generated successfully!</p>", unsafe_allow_html=True)

            st.markdown("""
                <script>
                window.open("http://localhost:8000", "_blank");
                </script>
            """, unsafe_allow_html=True)

# --- Accessibility Report Tab ---
with tab3:
    st.markdown("### ♿ Accessibility Test Reports")

    reports_dir = Path("reports/a11y")
    latest_report = None

    if reports_dir.exists():
        reports = sorted(reports_dir.glob("*.html"), key=os.path.getmtime, reverse=True)
        if reports:
            latest_report = reports[0]

    if latest_report:
        st.markdown(f"**Latest Accessibility Report:** `{latest_report.name}`")

        with open(latest_report, "rb") as file:
            btn = st.download_button(
                label="📥 Download Accessibility Report",
                data=file,
                file_name=latest_report.name,
                mime="text/html"
            )

        def encode_html(report_path):
            with open(report_path, "rb") as file:
                base64_html = base64.b64encode(file.read()).decode("utf-8")
            return f"data:text/html;base64,{base64_html}"

        if st.button("📑 View Accessibility Report"):
            st.markdown("#### 📜 Accessibility Report Preview:")
            report_data_uri = encode_html(latest_report)
            st.markdown(f'<iframe src="{report_data_uri}" width="100%" height="600px"></iframe>', unsafe_allow_html=True)
    else:
        st.warning("⚠ No accessibility reports found. Run accessibility tests first!")

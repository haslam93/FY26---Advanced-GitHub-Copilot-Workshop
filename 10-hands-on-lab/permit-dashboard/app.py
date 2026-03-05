"""
Permit Management Dashboard
A modern Streamlit application for managing and visualizing permit data.
Perfect for demonstrating GitHub Coding Agent capabilities.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import numpy as np

# Page configuration
st.set_page_config(
    page_title="Permit Management Dashboard",
    page_icon="📋",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        color: #1f77b4;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 0.5rem;
        border-left: 4px solid #1f77b4;
    }
    .stButton>button {
        background-color: #1f77b4;
        color: white;
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
        font-weight: bold;
    }
    </style>
""", unsafe_allow_html=True)

# Generate sample permit data
@st.cache_data
def generate_permit_data(num_records=100):
    """Generate realistic permit data for demonstration."""
    np.random.seed(42)
    
    regions = ['North', 'South', 'East', 'West', 'Central']
    permit_types = ['Building', 'Electrical', 'Plumbing', 'Mechanical', 'Demolition']
    statuses = ['Pending', 'Approved', 'Rejected', 'Under Review']
    
    start_date = datetime.now() - timedelta(days=365)
    
    data = []
    for i in range(num_records):
        permit_date = start_date + timedelta(days=np.random.randint(0, 365))
        data.append({
            'PermitID': f'PM-{1000 + i}',
            'Region': np.random.choice(regions),
            'PermitType': np.random.choice(permit_types),
            'Status': np.random.choice(statuses, p=[0.2, 0.5, 0.1, 0.2]),
            'SubmissionDate': permit_date,
            'Applicant': f'Applicant {i+1}',
            'Value': np.random.randint(5000, 500000),
            'ProcessingDays': np.random.randint(1, 60)
        })
    
    df = pd.DataFrame(data)
    df['SubmissionDate'] = pd.to_datetime(df['SubmissionDate'])
    return df

# Sidebar navigation
st.sidebar.title("🏛️ Navigation")
page = st.sidebar.radio(
    "Go to",
    ["🏠 Home", "📊 Analytics", "📋 Permit Tracker", "📈 Trends", "ℹ️ About"]
)

class Time:
    def get_time(self):
        import datetime
        t = datetime.datetime.now()
        return str(t.hour) + ":" + str(t.minute) + ":" + str(t.second)

t = Time()
print(t.get_time())

# Load data
df = generate_permit_data()

# ============================================================================
# HOME PAGE
# ============================================================================
if page == "🏠 Home":
    st.markdown('<p class="main-header">📋 Permit Management Dashboard</p>', unsafe_allow_html=True)
    
    st.markdown("""
    ### Welcome to the Permit Management System
    
    This dashboard provides comprehensive insights into permit applications, approvals, and processing times.
    Use the sidebar to navigate between different sections.
    """)
    
    # Key Metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="Total Permits",
            value=len(df),
            delta=f"+{np.random.randint(5, 15)} this week"
        )
    
    with col2:
        approved = len(df[df['Status'] == 'Approved'])
        approval_rate = (approved / len(df)) * 100
        st.metric(
            label="Approval Rate",
            value=f"{approval_rate:.1f}%",
            delta=f"{np.random.uniform(-2, 5):.1f}%"
        )
    
    with col3:
        avg_processing = df['ProcessingDays'].mean()
        st.metric(
            label="Avg Processing Time",
            value=f"{avg_processing:.0f} days",
            delta=f"-{np.random.randint(1, 5)} days"
        )
    
    with col4:
        total_value = df['Value'].sum() / 1_000_000
        st.metric(
            label="Total Value",
            value=f"${total_value:.1f}M",
            delta=f"+${np.random.uniform(0.5, 2):.1f}M"
        )
    
    st.divider()
    
    # Recent Activity
    st.subheader("📌 Recent Permit Activity")
    recent_permits = df.nlargest(10, 'SubmissionDate')[['PermitID', 'PermitType', 'Status', 'Region', 'SubmissionDate']]
    st.dataframe(recent_permits, use_container_width=True, hide_index=True)
    
    # Quick Actions
    st.divider()
    st.subheader("⚡ Quick Actions")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("📝 New Permit Application", use_container_width=True):
            st.info("Navigate to Permit Tracker to submit a new application")
    
    with col2:
        if st.button("🔍 Search Permits", use_container_width=True):
            st.info("Use the Analytics page for detailed searching")
    
    with col3:
        if st.button("📊 Generate Report", use_container_width=True):
            st.success("Report generation feature coming soon!")

# ============================================================================
# ANALYTICS PAGE
# ============================================================================
elif page == "📊 Analytics":
    st.markdown('<p class="main-header">📊 Permit Analytics</p>', unsafe_allow_html=True)
    
    # Filters
    st.sidebar.subheader("🔧 Filters")
    selected_regions = st.sidebar.multiselect(
        "Select Regions",
        options=df['Region'].unique(),
        default=df['Region'].unique()
    )
    
    selected_types = st.sidebar.multiselect(
        "Select Permit Types",
        options=df['PermitType'].unique(),
        default=df['PermitType'].unique()
    )
    
    # Filter data
    filtered_df = df[
        (df['Region'].isin(selected_regions)) &
        (df['PermitType'].isin(selected_types))
    ]
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Permits by Status")
        status_counts = filtered_df['Status'].value_counts()
        fig1 = px.pie(
            values=status_counts.values,
            names=status_counts.index,
            color_discrete_sequence=px.colors.qualitative.Set3
        )
        st.plotly_chart(fig1, use_container_width=True)
    
    with col2:
        st.subheader("Permits by Region")
        region_counts = filtered_df['Region'].value_counts()
        fig2 = px.bar(
            x=region_counts.index,
            y=region_counts.values,
            labels={'x': 'Region', 'y': 'Count'},
            color=region_counts.values,
            color_continuous_scale='Blues'
        )
        st.plotly_chart(fig2, use_container_width=True)
    
    st.divider()
    
    col3, col4 = st.columns(2)
    
    with col3:
        st.subheader("Permit Types Distribution")
        type_counts = filtered_df['PermitType'].value_counts()
        fig3 = px.bar(
            x=type_counts.values,
            y=type_counts.index,
            orientation='h',
            labels={'x': 'Count', 'y': 'Permit Type'},
            color=type_counts.values,
            color_continuous_scale='Greens'
        )
        st.plotly_chart(fig3, use_container_width=True)
    
    with col4:
        st.subheader("Value Distribution by Type")
        value_by_type = filtered_df.groupby('PermitType')['Value'].sum().sort_values(ascending=False)
        fig4 = px.bar(
            x=value_by_type.index,
            y=value_by_type.values,
            labels={'x': 'Permit Type', 'y': 'Total Value ($)'},
            color=value_by_type.values,
            color_continuous_scale='Oranges'
        )
        st.plotly_chart(fig4, use_container_width=True)

# ============================================================================
# PERMIT TRACKER PAGE
# ============================================================================
elif page == "📋 Permit Tracker":
    st.markdown('<p class="main-header">📋 Permit Tracker</p>', unsafe_allow_html=True)
    
    tab1, tab2 = st.tabs(["🔍 Search & Filter", "➕ New Application"])
    
    with tab1:
        st.subheader("Search Permits")
        
        search_col1, search_col2, search_col3 = st.columns(3)
        
        with search_col1:
            search_id = st.text_input("Permit ID", placeholder="e.g., PM-1001")
        
        with search_col2:
            search_status = st.selectbox("Status", ["All"] + list(df['Status'].unique()))
        
        with search_col3:
            search_region = st.selectbox("Region", ["All"] + list(df['Region'].unique()))
        
        # Apply filters
        search_df = df.copy()
        
        if search_id:
            search_df = search_df[search_df['PermitID'].str.contains(search_id, case=False)]
        
        if search_status != "All":
            search_df = search_df[search_df['Status'] == search_status]
        
        if search_region != "All":
            search_df = search_df[search_df['Region'] == search_region]
        
        st.write(f"**Found {len(search_df)} permits**")
        st.dataframe(search_df, use_container_width=True, hide_index=True)
        
        # Download button
        csv = search_df.to_csv(index=False)
        st.download_button(
            label="📥 Download Results as CSV",
            data=csv,
            file_name="permits_export.csv",
            mime="text/csv"
        )
    
    with tab2:
        st.subheader("Submit New Permit Application")
        
        with st.form("new_permit_form"):
            form_col1, form_col2 = st.columns(2)
            
            with form_col1:
                applicant_name = st.text_input("Applicant Name*", placeholder="Full Name")
                applicant_email = st.text_input("Email*", placeholder="email@example.com")
                permit_type = st.selectbox("Permit Type*", df['PermitType'].unique())
                region = st.selectbox("Region*", df['Region'].unique())
            
            with form_col2:
                project_address = st.text_area("Project Address*", placeholder="Street, City, ZIP")
                project_value = st.number_input("Estimated Project Value ($)*", min_value=0, step=1000)
                project_description = st.text_area("Project Description", placeholder="Brief description of the project")
            
            submitted = st.form_submit_button("🚀 Submit Application", use_container_width=True)
            
            if submitted:
                if applicant_name and applicant_email and project_address:
                    new_permit_id = f"PM-{len(df) + 1000}"
                    st.success(f"✅ Application submitted successfully! Your Permit ID is: **{new_permit_id}**")
                    st.balloons()
                else:
                    st.error("⚠️ Please fill in all required fields marked with *")

# ============================================================================
# TRENDS PAGE
# ============================================================================
elif page == "📈 Trends":
    st.markdown('<p class="main-header">📈 Permit Trends</p>', unsafe_allow_html=True)
    
    # Time series analysis
    st.subheader("📅 Submissions Over Time")
    
    # Aggregate by month
    df['Month'] = df['SubmissionDate'].dt.to_period('M').astype(str)
    monthly_counts = df.groupby('Month').size().reset_index(name='Count')
    
    fig_timeline = px.line(
        monthly_counts,
        x='Month',
        y='Count',
        markers=True,
        labels={'Month': 'Month', 'Count': 'Number of Permits'}
    )
    fig_timeline.update_traces(line_color='#1f77b4', line_width=3)
    st.plotly_chart(fig_timeline, use_container_width=True)
    
    st.divider()
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("⏱️ Processing Time Analysis")
        
        fig_processing = px.box(
            df,
            x='Status',
            y='ProcessingDays',
            color='Status',
            labels={'ProcessingDays': 'Processing Days', 'Status': 'Permit Status'}
        )
        st.plotly_chart(fig_processing, use_container_width=True)
    
    with col2:
        st.subheader("💰 Value Trends by Month")
        
        monthly_value = df.groupby('Month')['Value'].sum().reset_index()
        fig_value = px.area(
            monthly_value,
            x='Month',
            y='Value',
            labels={'Month': 'Month', 'Value': 'Total Value ($)'}
        )
        st.plotly_chart(fig_value, use_container_width=True)
    
    st.divider()
    
    # Heatmap
    st.subheader("🔥 Permit Activity Heatmap")
    
    heatmap_data = df.pivot_table(
        values='PermitID',
        index='Region',
        columns='PermitType',
        aggfunc='count',
        fill_value=0
    )
    
    fig_heatmap = px.imshow(
        heatmap_data,
        labels=dict(x="Permit Type", y="Region", color="Count"),
        aspect="auto",
        color_continuous_scale='Blues'
    )
    st.plotly_chart(fig_heatmap, use_container_width=True)

# ============================================================================
# ABOUT PAGE
# ============================================================================
elif page == "ℹ️ About":
    st.markdown('<p class="main-header">ℹ️ About This Dashboard</p>', unsafe_allow_html=True)
    
    st.markdown("""
    ### 📋 Permit Management Dashboard
    
    **Version:** 1.0.0  
    **Last Updated:** March 2026
    
    ---
    
    ### 🎯 Purpose
    
    This dashboard was created as part of the **GitHub Copilot Advanced Workshop** to demonstrate:
    
    - ✅ Building modern web applications with Streamlit
    - ✅ Using **GitHub Coding Agent** to update and enhance features
    - ✅ Data visualization with Plotly
    - ✅ Interactive forms and filters
    - ✅ Real-time analytics and trending
    
    ---
    
    ### 🚀 Features
    
    - **Home Dashboard**: Overview of key metrics and recent activity
    - **Analytics**: Interactive charts and visualizations
    - **Permit Tracker**: Search, filter, and submit new permit applications
    - **Trends**: Time-series analysis and heatmaps
    
    ---
    
    ### 🛠️ Built With
    
    - **Streamlit** - Web framework
    - **Plotly** - Interactive visualizations
    - **Pandas** - Data manipulation
    - **NumPy** - Numerical computing
    
    ---
    
    ### 📝 GitHub Coding Agent Demo Ideas
    
    Use GitHub Coding Agent to:
    
    1. **Add new chart types** (scatter plots, histograms, etc.)
    2. **Implement new filters** (date range, value range)
    3. **Add export features** (PDF reports, Excel exports)
    4. **Create new pages** (Admin panel, User management)
    5. **Enhance styling** (themes, custom CSS)
    6. **Add authentication** (user login, role-based access)
    7. **Implement notifications** (email alerts, webhooks)
    8. **Add database integration** (SQLite, PostgreSQL)
    
    ---
    
    ### 💡 Get Started
    
    Ask GitHub Coding Agent to enhance this app with prompts like:
    
    ```
    "Add a new page that shows permit approval rates by region with a bar chart"
    
    "Implement a date range filter on the Analytics page"
    
    "Add a dark mode toggle to the sidebar"
    
    "Create an export to PDF feature for the monthly report"
    ```
    
    ---
    
    ### 📚 Workshop Resources
    
    - [Module 09 - Copilot on GitHub](../09-copilot-on-github/README.md)
    - [GitHub Coding Agent Documentation](https://docs.github.com/en/copilot/using-github-copilot/code-review-with-github-copilot)
    - [Streamlit Documentation](https://docs.streamlit.io)
    
    """)
    
    st.divider()
    
    st.info("💡 **Tip:** Open an issue or PR on GitHub and use Coding Agent to implement changes automatically!")

# Footer
st.sidebar.divider()
st.sidebar.caption("🛠️ Built for GitHub Copilot Workshop")
st.sidebar.caption("© 2026 Enterprise Enablement")

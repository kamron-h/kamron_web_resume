## UNIA Project

The UNIA-ACL (Universal Negro Improvement Association and African Communities League) project is a voluntary initiative aimed at promoting equality and social justice through a fully-featured organization website. The codebase is open and continuously evolving, with ongoing improvements and new features added based on community feedback and member contributions.

---

## Table of Contents

- [UNIA Project](#unia-project)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Features](#features)
  - [Public Facing](#public-facing)
  - [Member Dashboard](#member-dashboard)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

UNIA is an organization website built to:

* Provide public visitors with information about our mission, outreach events, blog posts, calendar, store, and gallery.
* Offer members a secure dashboard experience with role-specific views and collaboration tools.

This project is maintained on a voluntary basis for personal promotion and to advance social justice causes.

---

## Features

### Public Facing

* **About Us**: Our mission, history, and leadership.
* **Outreach & Events**: Calendar and event details for public participation.
* **Blog**: Content management for news and articles.
* **Store**: E-commerce integration for merchandise and donations.
* **Gallery**: Public gallery showcasing images and media.
* **Registration Form**: Comprehensive sign-up form for new members.

### Member Dashboard

* **Role-Specific Dashboards**: Tailored views and permissions per user role.
* **Private Organization Calendar**: Internal events and reminders.
* **Messaging**: Peer-to-peer and group chat functionality.
* **Private Conferences**: Secure virtual meeting spaces.
* **Digital Library**: Document hosting via Cloudflare, with categorization and search.
* **Image Editing**: Tools for members to manage gallery assets.
* **Team Table**: CRUD operations for member and leadership records.
* **Notifications**: Real-time alerts for events, messages, and updates.
* **Profile Customization**: Editable user profiles and settings.

---

## Tech Stack

* **Backend**: Django, Django REST Framework
* **Frontend**: Bootstrap, JavaScript, HTML5, CSS3
* **Database**: PostgreSQL
* **Hosting & CDN**: Cloudflare
* **Real-time**: Django Channels, WebSockets
* **Messaging**: WebSocket or AJAX polling
* **DevOps**: Git, Docker, Railway (optional)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/----/unia-project.git
   cd unia-project
   ```
2. **Create and activate a virtual environment**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment variables**

   * Copy `.env.example` to `.env` and fill in the required keys (DATABASE\_URL, SECRET\_KEY, etc.)
5. **Apply migrations**

   ```bash
   python manage.py migrate
   ```
6. **Load initial data (optional)**

   ```bash
   python manage.py loaddata initial_data.json
   ```
7. **Run the development server**

   ```bash
   python manage.py runserver
   ```

---

## Usage

* Visit `http://localhost:8000/` for the public site.
* Register as a member to access the dashboard.
* Assign roles via the admin interface (`/admin/`).
* Use real-time chat and calendar features.

---

## Documentation

Detailed docs are available in the `docs/` directory, including:

* API reference
* Developer guides
* Architecture overview

---

## License

This project is NOT open-sourced under ANY Licenses. No one has permission to use this work outside of the UNIA-ACL BarcaClarke division.

---

## Acknowledgements

* UNIA community members for their support and feedback.
* Open-source projects and libraries that power this platform.

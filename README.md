# HenryWaltersDevelopment website template
My personal website. This may be freely used by anyone as a starting point for their own personal site.

## Features

This website contains a number of features

- Authorization & Authentication: Users can sign up and permissions can be assigned to them.
- Contact Form: Allow users to contact you
- About Page: A simple about page
- Projects Page: A page to showcase projects that is configured within the site
- Testimonials: Allow users to submit a testiomonial to help define your brand
- Admin Page: Control panel for several things within the site. Currently allows project & testimonial management

## Installation

After cloning the repository and in the root directory:

Install node modules in web and server directories
```cd web && npm install && cd ../server && npm install```

Create env files
```cp .env.sample .env && cp web/.env.sample web/.env```

Fill out env files with your specific information.
#!/bin/bash
# Add schema markup to existing route pages

for file in routes/*.html; do
  if ! grep -q "application/ld+json" "$file"; then
    echo "Adding schema to $file..."
    
    # Extract city name from filename
    city=$(basename "$file" .html)
    city_name=$(echo $city | sed 's/^./\U&/; s/-/ /g')
    
    # Insert schema before </head>
    sed -i '/<\/head>/i \    <script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "TravelAction",\n      "name": "Flights from Birmingham to '"$city_name"'",\n      "description": "Find cheap flights from Birmingham Airport to '"$city_name"'",\n      "url": "https://dlclaw.github.io/flights-from-birmingham/routes/'"$city"'.html"\n    }\n    </script>' "$file"
  fi
done

# Add schema to index.html
if ! grep -q "application/ld+json" "index.html"; then
  sed -i '/<\/head>/i \    <script type="application/ld+json">\n    {\n      "@context": "https://schema.org",\n      "@type": "WebSite",\n      "name": "Flights from Birmingham",\n      "description": "Find the cheapest flights from Birmingham Airport to destinations worldwide",\n      "url": "https://dlclaw.github.io/flights-from-birmingham/"\n    }\n    </script>' "index.html"
fi

echo "✅ Schema markup added!"

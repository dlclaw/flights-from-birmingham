#!/bin/bash
# Generate route pages quickly

ROUTES=(
"Barcelona:BCN:🇪🇸:35:Popular beach destination with Gaudi architecture"
"Malaga:AGP:🇪🇸:40:Costa del Sol sunshine and beaches"
"Alicante:ALC:🇪🇸:45:Mediterranean coast with stunning beaches"
"Rome:FCO:🇮🇹:50:Ancient history and Italian culture"
"Milan:MXP:🇮🇹:55:Fashion capital and northern Italian charm"
"Lisbon:LIS:🇵🇹:45:Coastal capital with historic charm"
"Prague:PRG:🇨🇿:40:Medieval beauty at budget prices"
"Krakow:KRK:🇵🇱:35:Historic Polish gem"
"Budapest:BUD:🇭🇺:40:Danube pearls and thermal baths"
"Copenhagen:CPH:🇩🇰:60:Scandinavian cool and design"
"Stockholm:ARN:🇸🇪:70:Archipelago beauty and Nordic charm"
"Geneva:GVA:🇨🇭:80:Alpine gateway and lakeside elegance"
)

for route in "${ROUTES[@]}"; do
  IFS=':' read -r city code flag price desc <<< "$route"
  filename="routes/$(echo $city | tr '[:upper:]' '[:lower:]').html"
  
  if [ ! -f "$filename" ]; then
    echo "Creating $filename..."
    cat > "$filename" << ROUTEEOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Find cheap flights from Birmingham to $city. Compare prices and book your trip. Flights from £$price.">
    <title>Flights from Birmingham to $city (BHX to $code) - From £$price</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="/" class="logo">
                    <span class="logo-icon">✈️</span>
                    <span class="logo-text">Flights from Birmingham</span>
                </a>
                <nav class="nav">
                    <a href="/#deals" class="nav-link">Deals</a>
                    <a href="/" class="nav-link">All Routes</a>
                </nav>
            </div>
        </div>
    </header>

    <section class="page-header">
        <div class="container">
            <h1 class="page-title">$flag Birmingham to $city</h1>
            <p class="page-subtitle">$desc - flights from £$price</p>
            <a href="https://www.google.com/travel/flights?q=flights+from+birmingham+to+$code" target="_blank" rel="nofollow" class="btn btn-secondary" style="margin-top: 24px;">Search Flights Now</a>
        </div>
    </section>

    <section class="content-section">
        <div class="container">
            <div class="content-grid">
                <div class="content-main">
                    <h2>Flying from Birmingham to $city</h2>
                    <p>$city is a popular destination from Birmingham Airport ($code). With direct flights and competitive prices, it's easy to plan your perfect trip.</p>

                    <h2>Flight Information</h2>
                    <ul>
                        <li><strong>Airport Code:</strong> $code</li>
                        <li><strong>Typical Price:</strong> From £$price</li>
                        <li><strong>Flight Time:</strong> Approximately 2-3 hours</li>
                        <li><strong>Airlines:</strong> Multiple carriers available</li>
                    </ul>

                    <h2>Why Visit $city?</h2>
                    <p>$desc. Whether you're visiting for a weekend break or an extended holiday, $city offers something for every traveler.</p>

                    <h2>Best Time to Book</h2>
                    <p>Book 6-8 weeks in advance for the best prices on Birmingham to $city flights. Prices vary by season, with summer typically seeing higher demand.</p>

                    <h2>Getting from Birmingham Airport</h2>
                    <p>Birmingham Airport (BHX) is well-connected with easy access from the city center via train, bus, or car. Allow 2-3 hours before your flight for check-in and security.</p>

                    <div class="cta-box">
                        <h3>Ready to Book Your Flight?</h3>
                        <p>Find the best deals on flights from Birmingham to $city</p>
                        <a href="https://www.google.com/travel/flights?q=flights+from+birmingham+to+$code" target="_blank" rel="nofollow" class="btn btn-primary">Search Flights</a>
                    </div>

                    <h2>Travel Tips</h2>
                    <ul>
                        <li>Book early for better prices and seat selection</li>
                        <li>Check visa requirements before traveling</li>
                        <li>Compare prices across different booking dates</li>
                        <li>Consider travel insurance for peace of mind</li>
                    </ul>
                </div>

                <div class="sidebar">
                    <div class="sidebar-card">
                        <h3>Quick Facts</h3>
                        <ul class="fact-list">
                            <li>📍 Destination: $city ($code)</li>
                            <li>⏱️ Flight Time: ~2-3 hours</li>
                            <li>💰 From: £$price</li>
                            <li>✈️ Direct Flights: Available</li>
                        </ul>
                    </div>

                    <div class="sidebar-card">
                        <h3>Popular Routes from Birmingham</h3>
                        <ul class="route-list">
                            <li><a href="/routes/paris.html">Paris</a></li>
                            <li><a href="/routes/dublin.html">Dublin</a></li>
                            <li><a href="/routes/amsterdam.html">Amsterdam</a></li>
                            <li><a href="/routes/barcelona.html">Barcelona</a></li>
                            <li><a href="/">View All Routes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 Flights from Birmingham. Find the best flight deals from BHX.</p>
            <p style="margin-top: 10px; font-size: 0.9em;">Prices shown are indicative and may vary. We may earn a commission from bookings.</p>
        </div>
    </footer>
</body>
</html>
ROUTEEOF
  fi
done

echo "✅ Route pages created!"

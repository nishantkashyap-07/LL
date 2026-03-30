# Layout System Examples

## Example 1: Landing Page Hero

```jsx
import { Section, Container, Flex, Stack } from './components/Layout';

function Hero() {
  return (
    <Section spacing="xl" background="gradient">
      <Container>
        <Stack spacing="xl" className="text-center">
          <h1 className="text-6xl font-bold">
            Welcome to LivinLease
          </h1>
          <p className="text-xl text-neutral-400">
            Premium vehicle rentals made simple
          </p>
          <Flex justify="center" gap="lg">
            <button className="btn-primary">Get Started</button>
            <button className="btn-secondary">Learn More</button>
          </Flex>
        </Stack>
      </Container>
    </Section>
  );
}
```

## Example 2: Feature Grid

```jsx
import { Section, Container, Grid, Card, Stack } from './components/Layout';
import { Shield, Clock, Star } from 'lucide-react';

function Features() {
  const features = [
    { icon: Shield, title: 'Secure', description: '100% secure payments' },
    { icon: Clock, title: '24/7 Support', description: 'Always here to help' },
    { icon: Star, title: 'Premium', description: 'Top-rated vehicles' }
  ];

  return (
    <Section spacing="lg">
      <Container>
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {features.map((feature, index) => (
            <Card key={index} hover padding="lg">
              <Stack spacing="default">
                <feature.icon className="w-8 h-8 text-primary-500" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-neutral-400">{feature.description}</p>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
```

## Example 3: Two-Column Layout

```jsx
import { Section, Container, Grid, Card, Stack } from './components/Layout';

function TwoColumn() {
  return (
    <Section>
      <Container>
        <Grid cols={{ sm: 1, md: 1, lg: 2 }} gap="xl">
          {/* Left Column */}
          <Stack spacing="lg">
            <h2 className="text-3xl font-bold">About Us</h2>
            <p className="text-neutral-400">
              We're revolutionizing vehicle rentals...
            </p>
            <button className="btn-primary">Learn More</button>
          </Stack>

          {/* Right Column */}
          <Card variant="glass">
            <img src="/image.jpg" alt="About" className="rounded-xl" />
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}
```

## Example 4: Dashboard Layout

```jsx
import { Container, Grid, Card, Stack, Flex, Divider } from './components/Layout';

function Dashboard() {
  return (
    <div className="pt-20 min-h-screen">
      <Container>
        <Stack spacing="xl">
          {/* Header */}
          <Flex justify="between" align="center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <button className="btn-primary">New Booking</button>
          </Flex>

          <Divider />

          {/* Stats Grid */}
          <Grid cols={{ sm: 2, md: 2, lg: 4 }} gap="lg">
            <Card>
              <Stack spacing="sm">
                <span className="text-sm text-neutral-400">Total Bookings</span>
                <span className="text-3xl font-bold">24</span>
              </Stack>
            </Card>
            {/* More stat cards... */}
          </Grid>

          {/* Main Content */}
          <Grid cols={{ sm: 1, md: 1, lg: 3 }} gap="lg">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                {/* Bookings list */}
              </Card>
            </div>
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                {/* Actions */}
              </Card>
            </div>
          </Grid>
        </Stack>
      </Container>
    </div>
  );
}
```

## Example 5: Form Layout

```jsx
import { Section, Container, Card, Stack, Grid } from './components/Layout';

function ContactForm() {
  return (
    <Section>
      <Container size="sm">
        <Card padding="lg">
          <Stack spacing="lg">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            
            <Grid cols={{ sm: 1, md: 2, lg: 2 }} gap="default">
              <div>
                <label className="block mb-2">First Name</label>
                <input type="text" className="input-elegant" />
              </div>
              <div>
                <label className="block mb-2">Last Name</label>
                <input type="text" className="input-elegant" />
              </div>
            </Grid>

            <div>
              <label className="block mb-2">Email</label>
              <input type="email" className="input-elegant" />
            </div>

            <div>
              <label className="block mb-2">Message</label>
              <textarea rows={5} className="input-elegant" />
            </div>

            <button className="btn-primary w-full">Send Message</button>
          </Stack>
        </Card>
      </Container>
    </Section>
  );
}
```

## Example 6: Pricing Cards

```jsx
import { Section, Container, Grid, Card, Stack, Flex } from './components/Layout';
import { Check } from 'lucide-react';

function Pricing() {
  const plans = [
    { name: 'Basic', price: 299, features: ['Feature 1', 'Feature 2'] },
    { name: 'Pro', price: 599, features: ['All Basic', 'Feature 3', 'Feature 4'] },
    { name: 'Premium', price: 999, features: ['All Pro', 'Feature 5', 'Feature 6'] }
  ];

  return (
    <Section spacing="xl">
      <Container>
        <Stack spacing="xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-neutral-400">
              Select the perfect plan for your needs
            </p>
          </div>

          <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
            {plans.map((plan, index) => (
              <Card key={index} hover padding="lg">
                <Stack spacing="lg">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <Flex align="baseline" gap="xs">
                      <span className="text-4xl font-bold">₹{plan.price}</span>
                      <span className="text-neutral-400">/day</span>
                    </Flex>
                  </div>

                  <Stack spacing="sm">
                    {plan.features.map((feature, idx) => (
                      <Flex key={idx} gap="sm" align="center">
                        <Check className="w-5 h-5 text-success-500" />
                        <span>{feature}</span>
                      </Flex>
                    ))}
                  </Stack>

                  <button className="btn-primary w-full">Choose Plan</button>
                </Stack>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}
```

## Example 7: Blog Post Layout

```jsx
import { Container, Stack, Card, Flex, Divider } from './components/Layout';

function BlogPost() {
  return (
    <div className="pt-20">
      <Container size="sm">
        <Stack spacing="xl">
          {/* Header */}
          <Stack spacing="lg">
            <h1 className="text-4xl font-bold">Blog Post Title</h1>
            <Flex gap="lg" align="center" className="text-neutral-400">
              <span>By John Doe</span>
              <span>•</span>
              <span>Jan 15, 2024</span>
              <span>•</span>
              <span>5 min read</span>
            </Flex>
          </Stack>

          <Divider />

          {/* Content */}
          <Stack spacing="lg" className="prose prose-invert max-w-none">
            <p>Blog post content...</p>
          </Stack>

          <Divider />

          {/* Author Card */}
          <Card>
            <Flex gap="lg" align="center">
              <img 
                src="/avatar.jpg" 
                alt="Author" 
                className="w-16 h-16 rounded-full"
              />
              <Stack spacing="xs">
                <h3 className="font-semibold">John Doe</h3>
                <p className="text-sm text-neutral-400">
                  Content writer and vehicle enthusiast
                </p>
              </Stack>
            </Flex>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}
```

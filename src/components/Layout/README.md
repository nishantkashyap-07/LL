# Layout System Documentation

A comprehensive layout system for LivinLease that provides consistent spacing, structure, and styling across the application.

## Components

### MainLayout
The main application layout wrapper that includes Navbar and Footer.

```jsx
import { MainLayout } from './components/Layout';

<MainLayout>
  <YourPageContent />
</MainLayout>
```

### Container
Provides consistent max-width and horizontal padding.

```jsx
import { Container } from './components/Layout';

<Container size="default">
  {/* Content */}
</Container>
```

**Props:**
- `size`: 'sm' | 'default' | 'lg' | 'full' (default: 'default')
- `noPadding`: boolean (default: false)
- `className`: string

**Sizes:**
- `sm`: max-w-4xl (896px)
- `default`: max-w-7xl (1280px)
- `lg`: max-w-[90rem] (1440px)
- `full`: max-w-full

### Section
Provides consistent vertical spacing for page sections.

```jsx
import { Section } from './components/Layout';

<Section spacing="lg" background="gradient">
  {/* Section content */}
</Section>
```

**Props:**
- `spacing`: 'none' | 'sm' | 'default' | 'lg' | 'xl'
- `background`: 'transparent' | 'subtle' | 'dark' | 'gradient'
- `className`: string

### PageHeader
Consistent header for internal pages with title, subtitle, and optional icon.

```jsx
import { PageHeader } from './components/Layout';
import { Car } from 'lucide-react';

<PageHeader 
  title="Browse Vehicles"
  subtitle="Find your perfect ride"
  icon={Car}
  background="gradient"
/>
```

**Props:**
- `title`: string (required)
- `subtitle`: string
- `icon`: React Component
- `background`: 'gradient' | 'dark' | 'subtle'
- `breadcrumbs`: React Node

### Grid
Responsive grid layout with consistent spacing.

```jsx
import { Grid } from './components/Layout';

<Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Props:**
- `cols`: { sm: number, md: number, lg: number }
- `gap`: 'none' | 'sm' | 'default' | 'lg' | 'xl'
- `className`: string

### Flex
Flexible layout component with common flex patterns.

```jsx
import { Flex } from './components/Layout';

<Flex direction="row" align="center" justify="between" gap="default">
  <div>Left</div>
  <div>Right</div>
</Flex>
```

**Props:**
- `direction`: 'row' | 'row-reverse' | 'col' | 'col-reverse'
- `align`: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
- `justify`: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
- `gap`: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl'
- `wrap`: boolean

### Stack
Vertical layout with consistent spacing.

```jsx
import { Stack } from './components/Layout';

<Stack spacing="lg" divider>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

**Props:**
- `spacing`: 'none' | 'xs' | 'sm' | 'default' | 'lg' | 'xl' | '2xl'
- `divider`: boolean
- `className`: string

### Card
Reusable card with consistent styling.

```jsx
import { Card } from './components/Layout';

<Card variant="glass" padding="lg" hover>
  {/* Card content */}
</Card>
```

**Props:**
- `variant`: 'default' | 'glass' | 'minimal' | 'elevated'
- `padding`: 'none' | 'sm' | 'default' | 'lg'
- `hover`: boolean
- `className`: string

### Divider
Visual separator with optional label.

```jsx
import { Divider } from './components/Layout';

<Divider label="OR" spacing="lg" />
<Divider orientation="vertical" />
```

**Props:**
- `label`: string
- `orientation`: 'horizontal' | 'vertical'
- `spacing`: 'none' | 'sm' | 'default' | 'lg'
- `className`: string

## Usage Examples

### Basic Page Layout

```jsx
import { Container, Section, PageHeader } from './components/Layout';
import { Car } from 'lucide-react';

function MyPage() {
  return (
    <>
      <PageHeader 
        title="My Page"
        subtitle="Page description"
        icon={Car}
      />
      
      <Section spacing="lg">
        <Container>
          {/* Page content */}
        </Container>
      </Section>
    </>
  );
}
```

### Grid Layout with Cards

```jsx
import { Container, Section, Grid, Card } from './components/Layout';

function VehicleGrid() {
  return (
    <Section>
      <Container>
        <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {vehicles.map(vehicle => (
            <Card key={vehicle.id} hover>
              {/* Vehicle content */}
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
```

### Flex Layout

```jsx
import { Container, Flex, Card } from './components/Layout';

function Header() {
  return (
    <Container>
      <Flex justify="between" align="center">
        <div>Logo</div>
        <Flex gap="lg">
          <button>Login</button>
          <button>Sign Up</button>
        </Flex>
      </Flex>
    </Container>
  );
}
```

### Stack with Dividers

```jsx
import { Stack, Divider } from './components/Layout';

function List() {
  return (
    <Stack spacing="lg" divider>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

## Design Principles

1. **Consistency**: All components use the same spacing scale
2. **Flexibility**: Props allow customization while maintaining consistency
3. **Composability**: Components work well together
4. **Responsive**: Built-in responsive behavior
5. **Accessibility**: Semantic HTML and proper structure

## Spacing Scale

- `none`: 0
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `default`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)

## Best Practices

1. Use `Container` for horizontal constraints
2. Use `Section` for vertical spacing between major page sections
3. Use `Grid` for equal-width columns
4. Use `Flex` for flexible layouts with different-sized items
5. Use `Stack` for vertical lists
6. Use `Card` for grouped content
7. Use `PageHeader` for consistent page titles

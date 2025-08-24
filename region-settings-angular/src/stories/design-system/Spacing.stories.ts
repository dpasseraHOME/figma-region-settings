import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Spacing & Layout tokens extracted from actual prototype usage
const spacingTokens = {
  spacing: {
    xs: { value: '4px', variable: '$spacing-xs', usage: 'Icon gaps, minimal spacing', usedIn: ['navbar icons', 'tech items'] },
    sm: { value: '8px', variable: '$spacing-sm', usage: 'Small gaps, button spacing', usedIn: ['button gaps', 'navbar brand gap'] },
    md: { value: '12px', variable: '$spacing-md', usage: 'Medium gaps, card padding', usedIn: ['button padding', 'page titles', 'navbar mobile'] },
    lg: { value: '16px', variable: '$spacing-lg', usage: 'Large gaps, section spacing', usedIn: ['page padding', 'hero margins', 'navbar gaps'] },
    xl: { value: '20px', variable: '$spacing-xl', usage: 'Extra large gaps, main padding', usedIn: ['button padding', 'app component padding'] },
    '2xl': { value: '24px', variable: '$spacing-2xl', usage: 'Section spacing', usedIn: ['dashboard gaps', 'control panels'] },
    '3xl': { value: '30px', variable: '$spacing-3xl', usage: 'Major section padding', usedIn: ['settings panel', 'page headers'] }
  },
  borderRadius: {
    sm: { value: '4px', variable: '$border-radius-sm', usage: 'Small elements, badges', usedIn: ['badges', 'tags'] },
    md: { value: '6px', variable: '$border-radius-md', usage: 'Buttons, inputs, cards', usedIn: ['buttons', 'region items', 'region sections', 'navbar links'] },
    lg: { value: '8px', variable: '$border-radius-lg', usage: 'Large cards, panels', usedIn: ['main panels', 'search inputs', 'feature cards', 'tech items'] }
  },
  shadows: {
    sm: { 
      value: '0px 1px 2px 0px rgba(12, 12, 12, 0.05)', 
      variable: '$shadow-sm', 
      usage: 'Subtle elevation', 
      usedIn: ['navbar', 'tech items'] 
    },
    md: { 
      value: '0px 1px 3px 0px rgba(12, 12, 12, 0.1), 0px 1px 2px -1px rgba(12, 12, 12, 0.1)', 
      variable: '$shadow-md', 
      usage: 'Standard elevation', 
      usedIn: ['main containers', 'feature cards'] 
    }
  },
  zIndex: {
    dropdown: { value: 1000, variable: '$z-index-dropdown', usage: 'Dropdowns, navbar', usedIn: ['navbar'] },
    regionSections: { value: '5, 4, 3, 2, 1', variable: 'component z-index', usage: 'Region section stacking', usedIn: ['region sections'] }
  },
  breakpoints: {
    mobile: { value: '768px', usage: 'Mobile and below', usedIn: ['all responsive components'] },
    tablet: { value: '1200px', usage: 'Tablet breakpoint', usedIn: ['dashboard grid', 'home layout'] },
    desktop: { value: '1400px', usage: 'Large desktop', usedIn: ['dashboard grid'] }
  },
  layout: {
    maxWidth: {
      content: { value: '800px', usage: 'Hero content width', usedIn: ['hero section'] },
      description: { value: '600px', usage: 'Description text width', usedIn: ['hero description'] },
      container: { value: '960px', usage: 'Settings panel width', usedIn: ['region settings'] },
      page: { value: '1200px', usage: 'Main page width', usedIn: ['regions page', 'navbar', 'home sections'] }
    },
    gridColumns: {
      dashboard: { value: '300px 1fr 280px', usage: 'Dashboard 3-column layout', usedIn: ['regions prototype B'] },
      features: { value: 'repeat(auto-fit, minmax(350px, 1fr))', usage: 'Feature cards grid', usedIn: ['home features'] },
      tech: { value: 'repeat(auto-fit, minmax(200px, 1fr))', usage: 'Tech stack grid', usedIn: ['home tech stack'] },
      regions: { value: 'repeat(auto-fit, minmax(400px, 1fr))', usage: 'Region cards grid', usedIn: ['dashboard regions'] }
    }
  }
};

@Component({
  selector: 'spacing-layout-system',
  imports: [CommonModule],
  template: `
    <div class="spacing-system">
      
      <!-- Spacing Scale Section -->
      <div class="system-section">
        <h2 class="section-title">Spacing Scale</h2>
        <p class="section-description">Consistent spacing values used throughout the application for margins, padding, and gaps.</p>
        <div class="spacing-grid">
          <div class="spacing-card" *ngFor="let space of getSpacingEntries()">
            <div class="spacing-visual">
              <div class="space-bar" [style.width]="space.token.value"></div>
              <div class="space-measurement">{{ space.token.value }}</div>
            </div>
            <div class="spacing-info">
              <div class="spacing-name">{{ space.name.toUpperCase() }}</div>
              <div class="spacing-variable">{{ space.token.variable }}</div>
              <div class="spacing-usage">{{ space.token.usage }}</div>
              <div class="spacing-used-in">
                <strong>Used in:</strong> {{ space.token.usedIn.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Border Radius Section -->
      <div class="system-section">
        <h2 class="section-title">Border Radius</h2>
        <p class="section-description">Rounded corner values for consistent visual hierarchy and modern aesthetics.</p>
        <div class="radius-grid">
          <div class="radius-card" *ngFor="let radius of getBorderRadiusEntries()">
            <div class="radius-visual">
              <div class="radius-sample" [style.border-radius]="radius.token.value"></div>
            </div>
            <div class="radius-info">
              <div class="radius-name">{{ radius.name.toUpperCase() }}</div>
              <div class="radius-variable">{{ radius.token.variable }}</div>
              <div class="radius-value">{{ radius.token.value }}</div>
              <div class="radius-usage">{{ radius.token.usage }}</div>
              <div class="radius-used-in">
                <strong>Used in:</strong> {{ radius.token.usedIn.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shadows Section -->
      <div class="system-section">
        <h2 class="section-title">Elevation & Shadows</h2>
        <p class="section-description">Subtle shadows create depth and visual hierarchy in the interface.</p>
        <div class="shadow-grid">
          <div class="shadow-card" *ngFor="let shadow of getShadowEntries()">
            <div class="shadow-visual">
              <div class="shadow-sample" [style.box-shadow]="shadow.token.value"></div>
            </div>
            <div class="shadow-info">
              <div class="shadow-name">{{ shadow.name.toUpperCase() }}</div>
              <div class="shadow-variable">{{ shadow.token.variable }}</div>
              <div class="shadow-usage">{{ shadow.token.usage }}</div>
              <div class="shadow-used-in">
                <strong>Used in:</strong> {{ shadow.token.usedIn.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Layout Patterns Section -->
      <div class="system-section">
        <h2 class="section-title">Layout Patterns</h2>
        <p class="section-description">Common layout patterns and container widths used across the application.</p>
        
        <div class="layout-subsection">
          <h3 class="subsection-title">Container Max Widths</h3>
          <div class="layout-examples">
            <div class="layout-example" *ngFor="let width of getMaxWidthEntries()">
              <div class="layout-bar" [style.max-width]="width.token.value" [style.width]="'100%'">
                <span class="layout-label">{{ width.name }} ({{ width.token.value }})</span>
              </div>
              <div class="layout-info">
                <div class="layout-usage">{{ width.token.usage }}</div>
                <div class="layout-used-in">{{ width.token.usedIn.join(', ') }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="layout-subsection">
          <h3 class="subsection-title">Responsive Breakpoints</h3>
          <div class="breakpoint-list">
            <div class="breakpoint-item" *ngFor="let bp of getBreakpointEntries()">
              <div class="breakpoint-name">{{ bp.name | titlecase }}</div>
              <div class="breakpoint-value">{{ bp.token.value }} and below</div>
              <div class="breakpoint-usage">{{ bp.token.usage }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .spacing-system {
      padding: 24px;
      font-family: 'Inter', sans-serif;
      max-width: 1200px;
    }

    .system-section {
      margin-bottom: 48px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #243342;
      margin: 0 0 8px 0;
    }

    .section-description {
      font-size: 16px;
      color: #687a8b;
      margin: 0 0 24px 0;
      line-height: 1.5;
    }

    /* Spacing Grid */
    .spacing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .spacing-card {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
    }

    .spacing-visual {
      margin-bottom: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .space-bar {
      height: 4px;
      background: #2fc584;
      border-radius: 2px;
      margin-bottom: 8px;
      min-width: 4px;
    }

    .space-measurement {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      color: #364e65;
    }

    .spacing-info {
      .spacing-name {
        font-size: 14px;
        font-weight: 600;
        color: #243342;
        margin-bottom: 4px;
      }

      .spacing-variable {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
        color: #2563eb;
        background: #f8fafc;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 8px;
      }

      .spacing-usage {
        font-size: 14px;
        color: #364e65;
        margin-bottom: 8px;
      }

      .spacing-used-in {
        font-size: 12px;
        color: #687a8b;
        line-height: 1.4;
      }
    }

    /* Border Radius Grid */
    .radius-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .radius-card {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .radius-visual {
      margin-bottom: 16px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .radius-sample {
      width: 80px;
      height: 80px;
      background: #2fc584;
      margin: 0 auto;
    }

    .radius-info {
      .radius-name {
        font-size: 14px;
        font-weight: 600;
        color: #243342;
        margin-bottom: 4px;
      }

      .radius-variable {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
        color: #2563eb;
        background: #f8fafc;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 4px;
      }

      .radius-value {
        font-size: 14px;
        font-weight: 500;
        color: #364e65;
        margin-bottom: 8px;
      }

      .radius-usage {
        font-size: 14px;
        color: #364e65;
        margin-bottom: 8px;
      }

      .radius-used-in {
        font-size: 12px;
        color: #687a8b;
        line-height: 1.4;
      }
    }

    /* Shadow Grid */
    .shadow-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .shadow-card {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .shadow-visual {
      margin-bottom: 16px;
      padding: 30px;
      background: #f8fafc;
      border-radius: 6px;
    }

    .shadow-sample {
      width: 100px;
      height: 60px;
      background: white;
      border-radius: 8px;
      margin: 0 auto;
    }

    .shadow-info {
      .shadow-name {
        font-size: 14px;
        font-weight: 600;
        color: #243342;
        margin-bottom: 4px;
      }

      .shadow-variable {
        font-family: 'Monaco', 'Menlo', monospace;
        font-size: 12px;
        color: #2563eb;
        background: #f8fafc;
        padding: 2px 6px;
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 8px;
      }

      .shadow-usage {
        font-size: 14px;
        color: #364e65;
        margin-bottom: 8px;
      }

      .shadow-used-in {
        font-size: 12px;
        color: #687a8b;
        line-height: 1.4;
      }
    }

    /* Layout Patterns */
    .layout-subsection {
      margin-bottom: 32px;
    }

    .subsection-title {
      font-size: 18px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 16px;
    }

    .layout-examples {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .layout-example {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
    }

    .layout-bar {
      background: #2fc584;
      height: 40px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }

    .layout-label {
      color: white;
      font-weight: 500;
      font-size: 14px;
    }

    .layout-info {
      .layout-usage {
        font-size: 14px;
        color: #364e65;
        margin-bottom: 4px;
      }

      .layout-used-in {
        font-size: 12px;
        color: #687a8b;
      }
    }

    .breakpoint-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .breakpoint-item {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 16px;
    }

    .breakpoint-name {
      font-size: 16px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 4px;
    }

    .breakpoint-value {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 14px;
      color: #2563eb;
      margin-bottom: 8px;
    }

    .breakpoint-usage {
      font-size: 14px;
      color: #687a8b;
    }

    @media (max-width: 768px) {
      .spacing-grid, .radius-grid, .shadow-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SpacingLayoutSystemComponent {
  spacingTokens = spacingTokens;

  getSpacingEntries() {
    return Object.entries(this.spacingTokens.spacing).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getBorderRadiusEntries() {
    return Object.entries(this.spacingTokens.borderRadius).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getShadowEntries() {
    return Object.entries(this.spacingTokens.shadows).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getMaxWidthEntries() {
    return Object.entries(this.spacingTokens.layout.maxWidth).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getBreakpointEntries() {
    return Object.entries(this.spacingTokens.breakpoints).map(([key, token]) => ({
      name: key,
      token
    }));
  }
}

const meta: Meta<SpacingLayoutSystemComponent> = {
  title: 'Design System/Spacing & Layout',
  component: SpacingLayoutSystemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Spacing & Layout System

Our spacing and layout system provides consistent measurements and patterns throughout the application. All values are extracted from actual prototype usage and follow a systematic approach to create visual hierarchy and proper spacing relationships.

## Usage

### Using Spacing Variables
\`\`\`scss
@use '../../../styles/variables' as *;

.my-component {
  padding: $spacing-md $spacing-lg;
  margin-bottom: $spacing-xl;
  gap: $spacing-sm;
}
\`\`\`

### Using Border Radius
\`\`\`scss
.card {
  border-radius: $border-radius-lg;  // 8px - for panels
}

.button {
  border-radius: $border-radius-md;  // 6px - for buttons
}

.badge {
  border-radius: $border-radius-sm;  // 4px - for small elements
}
\`\`\`

### Using Shadows
\`\`\`scss
.elevated-card {
  box-shadow: $shadow-md;  // Standard elevation
}

.subtle-element {
  box-shadow: $shadow-sm;  // Subtle elevation
}
\`\`\`

### Responsive Design
\`\`\`scss
.responsive-component {
  // Mobile first approach
  padding: $spacing-md;
  
  @media (max-width: 768px) {
    padding: $spacing-sm;
  }
}
\`\`\`

## Design Principles

- **Consistent Scale**: All spacing follows a predictable 4px base unit
- **Visual Hierarchy**: Larger spacing creates stronger separation
- **Responsive**: Values adapt appropriately at different screen sizes
- **Semantic**: Each value has a clear purpose and usage context
- **Minimal**: Only includes values actually used in the prototypes

## Spacing Scale Logic

- **XS (4px)**: Minimal gaps, icon spacing
- **SM (8px)**: Small gaps between related elements  
- **MD (12px)**: Medium gaps, button padding
- **LG (16px)**: Large gaps, section spacing
- **XL (20px)**: Extra large gaps, main padding
- **2XL (24px)**: Major section spacing
- **3XL (30px)**: Primary container padding
        `
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<SpacingLayoutSystemComponent>;

export const Default: Story = {};

export const SpacingScale: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Spacing Scale in Action</h2>
        <div style="background: white; border: 1px solid #e6e9ec; border-radius: 8px; padding: 20px;">
          <div style="margin-bottom: 4px; padding: 4px; background: #f8fafc; border-radius: 4px;">XS (4px) - Minimal spacing</div>
          <div style="margin-bottom: 8px; padding: 8px; background: #f8fafc; border-radius: 4px;">SM (8px) - Small gaps</div>
          <div style="margin-bottom: 12px; padding: 12px; background: #f8fafc; border-radius: 4px;">MD (12px) - Medium gaps</div>
          <div style="margin-bottom: 16px; padding: 16px; background: #f8fafc; border-radius: 4px;">LG (16px) - Large gaps</div>
          <div style="margin-bottom: 20px; padding: 20px; background: #f8fafc; border-radius: 4px;">XL (20px) - Extra large</div>
          <div style="margin-bottom: 24px; padding: 24px; background: #f8fafc; border-radius: 4px;">2XL (24px) - Section spacing</div>
          <div style="padding: 30px; background: #f8fafc; border-radius: 4px;">3XL (30px) - Major padding</div>
        </div>
      </div>
    `
  })
};

export const BorderRadiusExamples: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Border Radius Usage</h2>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: #2fc584; border-radius: 4px; margin: 0 auto 8px;"></div>
            <div style="font-size: 14px; color: #364e65;">SM (4px)</div>
            <div style="font-size: 12px; color: #687a8b;">Badges, Tags</div>
          </div>
          <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: #2563eb; border-radius: 6px; margin: 0 auto 8px;"></div>
            <div style="font-size: 14px; color: #364e65;">MD (6px)</div>
            <div style="font-size: 12px; color: #687a8b;">Buttons, Cards</div>
          </div>
          <div style="text-align: center;">
            <div style="width: 60px; height: 60px; background: #120b3c; border-radius: 8px; margin: 0 auto 8px;"></div>
            <div style="font-size: 14px; color: #364e65;">LG (8px)</div>
            <div style="font-size: 12px; color: #687a8b;">Panels, Inputs</div>
          </div>
        </div>
      </div>
    `
  })
};

export const ShadowElevation: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif; background: #f8fafc;">
        <h2 style="margin-bottom: 24px; color: #243342;">Shadow Elevation Levels</h2>
        <div style="display: flex; gap: 30px; flex-wrap: wrap;">
          <div style="text-align: center;">
            <div style="
              width: 120px; 
              height: 80px; 
              background: white; 
              border-radius: 8px; 
              box-shadow: 0px 1px 2px 0px rgba(12, 12, 12, 0.05);
              margin: 0 auto 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #687a8b;
            ">Subtle</div>
            <div style="font-size: 14px; color: #364e65; margin-bottom: 4px;">Small Shadow</div>
            <div style="font-size: 12px; color: #687a8b;">Navbar, Tech items</div>
          </div>
          <div style="text-align: center;">
            <div style="
              width: 120px; 
              height: 80px; 
              background: white; 
              border-radius: 8px; 
              box-shadow: 0px 1px 3px 0px rgba(12, 12, 12, 0.1), 0px 1px 2px -1px rgba(12, 12, 12, 0.1);
              margin: 0 auto 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              color: #687a8b;
            ">Standard</div>
            <div style="font-size: 14px; color: #364e65; margin-bottom: 4px;">Medium Shadow</div>
            <div style="font-size: 12px; color: #687a8b;">Cards, Panels</div>
          </div>
        </div>
      </div>
    `
  })
};

export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Responsive Breakpoints</h2>
        <div style="background: white; border: 1px solid #e6e9ec; border-radius: 8px; padding: 20px;">
          <div style="margin-bottom: 16px;">
            <div style="font-weight: 600; color: #243342; margin-bottom: 4px;">Mobile (768px and below)</div>
            <div style="font-size: 14px; color: #687a8b;">Single column layouts, reduced padding, stacked navigation</div>
          </div>
          <div style="margin-bottom: 16px;">
            <div style="font-weight: 600; color: #243342; margin-bottom: 4px;">Tablet (1200px and below)</div>
            <div style="font-size: 14px; color: #687a8b;">Dashboard becomes single column, adjusted grid layouts</div>
          </div>
          <div>
            <div style="font-weight: 600; color: #243342; margin-bottom: 4px;">Desktop (1400px and below)</div>
            <div style="font-size: 14px; color: #687a8b;">Optimized dashboard grid, reduced sidebar widths</div>
          </div>
        </div>
      </div>
    `
  })
};

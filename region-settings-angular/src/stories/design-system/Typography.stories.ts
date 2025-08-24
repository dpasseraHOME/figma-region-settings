import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Typography token data extracted from _variables.scss and _mixins.scss
const typographyTokens = {
  fontFamily: {
    primary: { value: 'Inter, sans-serif', variable: '$font-family', description: 'Primary font family used throughout the application' }
  },
  fontWeights: {
    regular: { value: 400, variable: '$font-regular', description: 'Regular weight for body text and standard content' },
    medium: { value: 500, variable: '$font-medium', description: 'Medium weight for emphasis and button text' },
    semibold: { value: 600, variable: '$font-semibold', description: 'Semibold weight for headings and important labels' }
  },
  fontSizes: {
    xs: { value: '12px', variable: '$font-size-xs', description: 'Extra small text for badges, tags, and fine print' },
    sm: { value: '14px', variable: '$font-size-sm', description: 'Small text for labels, captions, and secondary content' },
    md: { value: '15px', variable: '$font-size-md', description: 'Medium text for input placeholders and search' },
    lg: { value: '16px', variable: '$font-size-lg', description: 'Large text for subtitles and prominent labels' },
    xl: { value: '18px', variable: '$font-size-xl', description: 'Extra large text for titles and main headings' }
  },
  lineHeights: {
    tight: { value: 1, variable: '$line-height-tight', description: 'Tight line height for headings and compact text' },
    snug: { value: 1.2, variable: '$line-height-snug', description: 'Snug line height for subtitles' },
    normal: { value: 1.4, variable: '$line-height-normal', description: 'Normal line height for readable body text' },
    relaxed: { value: 1.6, variable: '$line-height-relaxed', description: 'Relaxed line height for comfortable reading' }
  },
  mixins: {
    title: {
      name: 'text-title',
      variable: '@mixin text-title',
      styles: { color: '#243342', fontSize: '18px', fontWeight: 500, lineHeight: 1 },
      description: 'Main titles and primary headings'
    },
    subtitle: {
      name: 'text-subtitle', 
      variable: '@mixin text-subtitle',
      styles: { color: '#243342', fontSize: '16px', fontWeight: 600, lineHeight: 1 },
      description: 'Secondary headings and section titles'
    },
    label: {
      name: 'text-label',
      variable: '@mixin text-label', 
      styles: { color: '#687a8b', fontSize: '14px', fontWeight: 600 },
      description: 'Form labels and category headers'
    },
    body: {
      name: 'text-body',
      variable: '@mixin text-body',
      styles: { color: '#364e65', fontSize: '14px', fontWeight: 400 },
      description: 'Standard body text and descriptions'
    }
  }
};

@Component({
  selector: 'typography-system',
  imports: [CommonModule],
  template: `
    <div class="typography-system">
      
      <!-- Font Family Section -->
      <div class="typography-section">
        <h2 class="section-title">Font Family</h2>
        <p class="section-description">Our primary typeface provides excellent readability and modern aesthetics.</p>
        <div class="font-family-demo">
          <div class="font-sample">
            <div class="sample-text" [style]="'font-family: ' + typographyTokens.fontFamily.primary.value">
              The quick brown fox jumps over the lazy dog
            </div>
            <div class="sample-details">
              <div class="sample-name">Inter</div>
              <div class="sample-variable">{{ typographyTokens.fontFamily.primary.variable }}</div>
              <div class="sample-description">{{ typographyTokens.fontFamily.primary.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Font Weights Section -->
      <div class="typography-section">
        <h2 class="section-title">Font Weights</h2>
        <p class="section-description">Three carefully selected weights provide hierarchy and emphasis.</p>
        <div class="weight-grid">
          <div class="weight-card" *ngFor="let weight of getWeightEntries()">
            <div class="weight-sample" 
                 [style]="'font-weight: ' + weight.token.value + '; font-family: Inter, sans-serif'">
              Aa {{ weight.token.value }}
            </div>
            <div class="weight-info">
              <div class="weight-name">{{ weight.name | titlecase }}</div>
              <div class="weight-variable">{{ weight.token.variable }}</div>
              <div class="weight-value">{{ weight.token.value }}</div>
              <div class="weight-description">{{ weight.token.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Font Sizes Section -->
      <div class="typography-section">
        <h2 class="section-title">Font Sizes</h2>
        <p class="section-description">A modular scale ensures consistent sizing across all text elements.</p>
        <div class="size-list">
          <div class="size-item" *ngFor="let size of getSizeEntries()">
            <div class="size-sample" 
                 [style]="'font-size: ' + size.token.value + '; font-family: Inter, sans-serif'">
              Sample Text
            </div>
            <div class="size-info">
              <div class="size-details">
                <span class="size-name">{{ size.name.toUpperCase() }}</span>
                <span class="size-value">{{ size.token.value }}</span>
                <span class="size-variable">{{ size.token.variable }}</span>
              </div>
              <div class="size-description">{{ size.token.description }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Typography Mixins Section -->
      <div class="typography-section">
        <h2 class="section-title">Typography Mixins</h2>
        <p class="section-description">Pre-defined text styles for consistent application of typography patterns.</p>
        <div class="mixin-list">
          <div class="mixin-item" *ngFor="let mixin of getMixinEntries()">
            <div class="mixin-sample" [ngStyle]="mixin.token.styles">
              {{ getMixinSampleText(mixin.name) }}
            </div>
            <div class="mixin-info">
              <div class="mixin-name">{{ mixin.token.name }}</div>
              <div class="mixin-variable">{{ mixin.token.variable }}</div>
              <div class="mixin-description">{{ mixin.token.description }}</div>
              <div class="mixin-styles">
                <span *ngFor="let style of getStyleEntries(mixin.token.styles)" class="style-property">
                  {{ style.key }}: {{ style.value }}{{ style.unit }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .typography-system {
      padding: 24px;
      font-family: 'Inter', sans-serif;
      max-width: 1200px;
    }

    .typography-section {
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

    /* Font Family Demo */
    .font-family-demo {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 24px;
    }

    .font-sample {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .sample-text {
      font-size: 24px;
      color: #243342;
      letter-spacing: -0.5px;
    }

    .sample-details {
      border-top: 1px solid #e6e9ec;
      padding-top: 16px;
    }

    .sample-name {
      font-size: 18px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 4px;
    }

    .sample-variable {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 14px;
      color: #2563eb;
      background: #f8fafc;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 8px;
    }

    .sample-description {
      font-size: 14px;
      color: #687a8b;
      line-height: 1.4;
    }

    /* Font Weights Grid */
    .weight-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .weight-card {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
    }

    .weight-sample {
      font-size: 48px;
      color: #243342;
      margin-bottom: 16px;
      line-height: 1;
    }

    .weight-name {
      font-size: 16px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 4px;
    }

    .weight-variable, .size-variable, .mixin-variable {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      color: #2563eb;
      background: #f8fafc;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 4px;
    }

    .weight-value {
      font-size: 14px;
      font-weight: 600;
      color: #364e65;
      margin-bottom: 8px;
    }

    .weight-description, .size-description, .mixin-description {
      font-size: 12px;
      color: #687a8b;
      line-height: 1.4;
    }

    /* Font Sizes List */
    .size-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .size-item {
      display: flex;
      align-items: center;
      gap: 24px;
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 20px;
    }

    .size-sample {
      min-width: 120px;
      color: #243342;
      font-weight: 500;
    }

    .size-info {
      flex: 1;
    }

    .size-details {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .size-name {
      font-weight: 600;
      color: #243342;
      min-width: 24px;
    }

    .size-value {
      font-weight: 500;
      color: #364e65;
      min-width: 36px;
    }

    /* Typography Mixins */
    .mixin-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .mixin-item {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      padding: 24px;
    }

    .mixin-sample {
      font-family: 'Inter', sans-serif;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e6e9ec;
    }

    .mixin-name {
      font-size: 16px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 4px;
    }

    .mixin-styles {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 8px;
    }

    .style-property {
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 12px;
      color: #364e65;
      background: #f3f4f5;
      padding: 4px 8px;
      border-radius: 4px;
    }

    @media (max-width: 768px) {
      .size-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      .size-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }

      .mixin-styles {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
})
export class TypographySystemComponent {
  typographyTokens = typographyTokens;

  getWeightEntries() {
    return Object.entries(this.typographyTokens.fontWeights).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getSizeEntries() {
    return Object.entries(this.typographyTokens.fontSizes).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getMixinEntries() {
    return Object.entries(this.typographyTokens.mixins).map(([key, token]) => ({
      name: key,
      token
    }));
  }

  getMixinSampleText(mixinName: string): string {
    const sampleTexts = {
      title: 'Main Page Title',
      subtitle: 'Section Subtitle',
      label: 'Form Label:',
      body: 'This is standard body text that provides detailed information and context.'
    };
    return sampleTexts[mixinName as keyof typeof sampleTexts] || 'Sample Text';
  }

  getStyleEntries(styles: any) {
    return Object.entries(styles).map(([key, value]) => ({
      key: this.camelToKebab(key),
      value: typeof value === 'string' ? value.replace(/px|#[\w]+/, '') : value,
      unit: typeof value === 'string' && value.includes('px') ? 'px' : 
            typeof value === 'string' && value.includes('#') ? '' : ''
    }));
  }

  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

const meta: Meta<TypographySystemComponent> = {
  title: 'Design System/Typography',
  component: TypographySystemComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Typography System

Our typography system is built on the Inter font family and provides a consistent hierarchy for all text elements. The system includes carefully chosen font weights, sizes, line heights, and pre-defined mixins for common text patterns.

## Usage

### Using Variables
\`\`\`scss
@use '../../../styles/variables' as *;

.my-text {
  font-family: $font-family;
  font-size: $font-size-lg;
  font-weight: $font-medium;
  line-height: $line-height-normal;
}
\`\`\`

### Using Mixins
\`\`\`scss
@use '../../../styles/mixins' as *;

.page-title {
  @include text-title;
}

.section-header {
  @include text-subtitle;
}

.form-label {
  @include text-label;
}

.description {
  @include text-body;
}
\`\`\`

## Accessibility

All typography follows accessibility best practices:
- **Minimum font size**: 12px for small text, 14px for body text
- **Contrast ratios**: All text colors meet WCAG AA standards
- **Line heights**: Optimized for readability across all sizes
- **Font weights**: Clear hierarchy without being too heavy

## Typography Scale

The font size scale follows a modular approach:
- **XS (12px)**: Badges, tags, fine print
- **SM (14px)**: Body text, labels, captions  
- **MD (15px)**: Input placeholders, search text
- **LG (16px)**: Subtitles, prominent labels
- **XL (18px)**: Main titles, headings
        `
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<TypographySystemComponent>;

export const Default: Story = {};

export const FontWeights: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Font Weight Examples</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="font-weight: 400; font-size: 18px; color: #243342;">
            Regular (400) - Standard body text and general content
          </div>
          <div style="font-weight: 500; font-size: 18px; color: #243342;">
            Medium (500) - Emphasis text and button labels
          </div>
          <div style="font-weight: 600; font-size: 18px; color: #243342;">
            Semibold (600) - Headings and important labels
          </div>
        </div>
      </div>
    `
  })
};

export const FontSizes: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Font Size Scale</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="font-size: 12px; color: #243342;">XS (12px) - Badge text, fine print</div>
          <div style="font-size: 14px; color: #243342;">SM (14px) - Body text, labels</div>
          <div style="font-size: 15px; color: #243342;">MD (15px) - Input placeholders</div>
          <div style="font-size: 16px; color: #243342;">LG (16px) - Subtitles</div>
          <div style="font-size: 18px; color: #243342;">XL (18px) - Main titles</div>
        </div>
      </div>
    `
  })
};

export const TypographyMixins: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Typography Mixin Examples</h2>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div>
            <div style="color: #243342; font-size: 18px; font-weight: 500; line-height: 1; margin-bottom: 4px;">
              Page Title (@mixin text-title)
            </div>
            <small style="color: #687a8b;">18px, medium weight, tight line height</small>
          </div>
          <div>
            <div style="color: #243342; font-size: 16px; font-weight: 600; line-height: 1; margin-bottom: 4px;">
              Section Subtitle (@mixin text-subtitle)
            </div>
            <small style="color: #687a8b;">16px, semibold weight, tight line height</small>
          </div>
          <div>
            <div style="color: #687a8b; font-size: 14px; font-weight: 600; margin-bottom: 4px;">
              Form Label (@mixin text-label)
            </div>
            <small style="color: #687a8b;">14px, semibold weight, muted color</small>
          </div>
          <div>
            <div style="color: #364e65; font-size: 14px; font-weight: 400; margin-bottom: 4px;">
              Body Text (@mixin text-body)
            </div>
            <small style="color: #687a8b;">14px, regular weight, body color</small>
          </div>
        </div>
      </div>
    `
  })
};

export const LineHeights: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 24px; color: #243342;">Line Height Examples</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px;">
          <div>
            <h3 style="color: #243342; margin-bottom: 8px;">Tight (1.0)</h3>
            <p style="line-height: 1; color: #364e65; border: 1px solid #e6e9ec; padding: 12px; border-radius: 4px;">
              Perfect for headings and titles where space is at a premium. Creates compact, impactful text.
            </p>
          </div>
          <div>
            <h3 style="color: #243342; margin-bottom: 8px;">Snug (1.2)</h3>
            <p style="line-height: 1.2; color: #364e65; border: 1px solid #e6e9ec; padding: 12px; border-radius: 4px;">
              Good for subtitles and secondary headings that need to be readable but still compact.
            </p>
          </div>
          <div>
            <h3 style="color: #243342; margin-bottom: 8px;">Normal (1.4)</h3>
            <p style="line-height: 1.4; color: #364e65; border: 1px solid #e6e9ec; padding: 12px; border-radius: 4px;">
              Standard line height for most body text, providing good readability without taking too much space.
            </p>
          </div>
          <div>
            <h3 style="color: #243342; margin-bottom: 8px;">Relaxed (1.6)</h3>
            <p style="line-height: 1.6; color: #364e65; border: 1px solid #e6e9ec; padding: 12px; border-radius: 4px;">
              Comfortable reading experience for longer content blocks and detailed descriptions.
            </p>
          </div>
        </div>
      </div>
    `
  })
};

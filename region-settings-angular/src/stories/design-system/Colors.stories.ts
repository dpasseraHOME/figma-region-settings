import type { Meta, StoryObj } from '@storybook/angular';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Color token data extracted from _variables.scss
const colorTokens = {
  text: {
    strong: { value: '#243342', variable: '$text-strong', description: 'Primary text color for headings and important content' },
    body: { value: '#364e65', variable: '$text-body', description: 'Standard body text color' },
    muted: { value: '#687a8b', variable: '$text-muted', description: 'Secondary text color for labels and subtle content' }
  },
  background: {
    white: { value: '#ffffff', variable: '$white', description: 'Pure white background' },
    container: { value: '#ffffff', variable: '$bg-container', description: 'Main container background' },
    level1: { value: '#f3f4f5', variable: '$bg-level1', description: 'Subtle background for cards and sections' },
    darkBlue: { value: '#120b3c', variable: '$bg-dark-blue', description: 'Dark background for BASE tags and accents' }
  },
  border: {
    weak: { value: '#e6e9ec', variable: '$border-weak', description: 'Subtle borders for cards and dividers' },
    strong: { value: '#cdd3d8', variable: '$border-strong', description: 'Prominent borders for buttons and inputs' }
  },
  accent: {
    green: { value: '#2fc584', variable: '$accent-green', description: 'Primary accent color for success states and CTAs' },
    blue: { value: '#2563eb', variable: '$accent-blue', description: 'Secondary accent color for interactive elements' },
    blueDark: { value: '#1d4ed8', variable: '$accent-blue-dark', description: 'Darker blue for active states' }
  }
};

@Component({
  selector: 'color-palette',
  imports: [CommonModule],
  template: `
    <div class="color-palette">
      <div class="color-section" *ngFor="let section of colorSections">
        <h2 class="section-title">{{ section.title }}</h2>
        <p class="section-description">{{ section.description }}</p>
        <div class="color-grid">
          <div class="color-card" *ngFor="let color of section.colors">
            <div class="color-swatch" [style.background-color]="color.value"></div>
            <div class="color-info">
              <div class="color-name">{{ color.name }}</div>
              <div class="color-variable">{{ color.variable }}</div>
              <div class="color-hex">{{ color.value }}</div>
              <div class="color-description">{{ color.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .color-palette {
      padding: 24px;
      font-family: 'Inter', sans-serif;
    }

    .color-section {
      margin-bottom: 48px;
    }

    .section-title {
      font-size: 24px;
      font-weight: 600;
      color: #243342;
      margin: 0 0 8px 0;
      text-transform: capitalize;
    }

    .section-description {
      font-size: 16px;
      color: #687a8b;
      margin: 0 0 24px 0;
      line-height: 1.5;
    }

    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .color-card {
      background: white;
      border: 1px solid #e6e9ec;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0px 1px 3px 0px rgba(12, 12, 12, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .color-card:hover {
      transform: translateY(-2px);
      box-shadow: 0px 4px 12px 0px rgba(12, 12, 12, 0.15);
    }

    .color-swatch {
      height: 80px;
      width: 100%;
      position: relative;
      cursor: pointer;
    }

    .color-swatch::after {
      content: 'Click to copy';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .color-swatch:hover::after {
      opacity: 1;
    }

    .color-info {
      padding: 16px;
    }

    .color-name {
      font-size: 16px;
      font-weight: 600;
      color: #243342;
      margin-bottom: 4px;
      text-transform: capitalize;
    }

    .color-variable {
      font-size: 14px;
      font-family: 'Monaco', 'Menlo', monospace;
      color: #2563eb;
      background: #f8fafc;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 4px;
    }

    .color-hex {
      font-size: 14px;
      font-family: 'Monaco', 'Menlo', monospace;
      color: #364e65;
      margin-bottom: 8px;
      text-transform: uppercase;
    }

    .color-description {
      font-size: 14px;
      color: #687a8b;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .color-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ColorPaletteComponent {
  colorSections = [
    {
      title: 'Text Colors',
      description: 'Text colors provide hierarchy and readability across the interface.',
      colors: Object.entries(colorTokens.text).map(([key, token]) => ({
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
        ...token
      }))
    },
    {
      title: 'Background Colors',
      description: 'Background colors create depth and structure in the layout.',
      colors: Object.entries(colorTokens.background).map(([key, token]) => ({
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
        ...token
      }))
    },
    {
      title: 'Border Colors',
      description: 'Border colors define boundaries and separate content areas.',
      colors: Object.entries(colorTokens.border).map(([key, token]) => ({
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
        ...token
      }))
    },
    {
      title: 'Accent Colors',
      description: 'Accent colors highlight important actions and interactive elements.',
      colors: Object.entries(colorTokens.accent).map(([key, token]) => ({
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
        ...token
      }))
    }
  ];
}

const meta: Meta<ColorPaletteComponent> = {
  title: 'Design System/Colors',
  component: ColorPaletteComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Color System

Our color palette is carefully crafted to provide excellent contrast, accessibility, and visual hierarchy. All colors are defined as SCSS variables in \`src/styles/_variables.scss\` and can be imported throughout the application.

## Usage

\`\`\`scss
@use '../../../styles/variables' as *;

.my-component {
  color: $text-strong;
  background-color: $bg-level1;
  border: 1px solid $border-weak;
}
\`\`\`

## Accessibility

All text colors meet WCAG AA contrast requirements when used with appropriate backgrounds:
- **Text Strong** (#243342) - Use on light backgrounds
- **Text Body** (#364e65) - Use on light backgrounds  
- **Text Muted** (#687a8b) - Use for secondary content on light backgrounds

## Color Categories

Each color serves a specific purpose in the design system and should be used consistently across components.
        `
      }
    },
    layout: 'fullscreen'
  }
};

export default meta;
type Story = StoryObj<ColorPaletteComponent>;

export const Default: Story = {};

export const TextColors: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 16px;">Text Color Examples</h2>
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e6e9ec;">
          <h1 style="color: #243342; margin: 0 0 8px 0;">Heading Text (Text Strong)</h1>
          <p style="color: #364e65; margin: 0 0 8px 0;">Body text provides the main content and should be easily readable (Text Body).</p>
          <small style="color: #687a8b; margin: 0;">Secondary information and labels use muted text (Text Muted).</small>
        </div>
      </div>
    `
  })
};

export const BackgroundLayers: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; background: #f3f4f5;">
        <h2 style="margin-bottom: 16px; color: #243342;">Background Layer Examples</h2>
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
          <h3 style="color: #243342; margin: 0 0 8px 0;">White Background</h3>
          <p style="color: #364e65; margin: 0;">Primary container background</p>
        </div>
        <div style="background: #f3f4f5; padding: 20px; border-radius: 8px; border: 1px solid #e6e9ec;">
          <h3 style="color: #243342; margin: 0 0 8px 0;">Level 1 Background</h3>
          <p style="color: #364e65; margin: 0;">Subtle background for secondary containers</p>
        </div>
      </div>
    `
  })
};

export const AccentColors: Story = {
  render: () => ({
    template: `
      <div style="padding: 24px; font-family: 'Inter', sans-serif;">
        <h2 style="margin-bottom: 16px; color: #243342;">Accent Color Usage</h2>
        <div style="display: flex; gap: 16px; flex-wrap: wrap;">
          <button style="
            background: #2fc584; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 6px; 
            font-weight: 500;
            cursor: pointer;
          ">
            Primary Action (Green)
          </button>
          <button style="
            background: #2563eb; 
            color: white; 
            border: none; 
            padding: 12px 24px; 
            border-radius: 6px; 
            font-weight: 500;
            cursor: pointer;
          ">
            Secondary Action (Blue)
          </button>
          <div style="
            background: #120b3c; 
            color: white; 
            padding: 8px 12px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          ">
            <span>✓</span> BASE
          </div>
        </div>
      </div>
    `
  })
};

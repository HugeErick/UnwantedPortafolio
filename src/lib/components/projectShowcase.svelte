<script lang="ts">
import { onMount } from "svelte";
import * as Card from "$lib/components/ui/card/index.js";
import * as Collapsible from "$lib/components/ui/collapsible/index.js";
import { Badge } from "$lib/components/ui/badge/index.js";
import { Button } from "$lib/components/ui/button/index.js";
import ChevronUp from "lucide-svelte/icons/chevron-up";
import ChevronDown from "lucide-svelte/icons/chevron-down";
import { initElectricCursor } from '$lib/electricCursor';

import scrapeImg from "$lib/assets/scrapeengine.png";
import nvimImg from "$lib/assets/nvimimage.png";

onMount(() => {
  const cleanup = initElectricCursor();
  return cleanup;
});

const projects = [
  {
    title: "ScrapeEngine",
    description: "ScrapeEngine is a lightweight web scraper built using Playwright JS library. It extracts content from specified URLs, focusing several html tags, and saves the scraped data into individual JSON files.",
    image: scrapeImg, // Using the variable, not a string
    github: "https://github.com/HugeErick/ScrapeEngine",
    techs: ["Javascript"]
  },
  {
    title: "Unsleep",
    description: "Unsleep is very lightweight mouse jiggler to avoid your laptop to suspend/sleep.",
    image: "", // Keep as empty string if no asset exists yet
    github: "https://github.com/HugeErick/Unsleep",
    techs: ["Rust"]
  },
  {
    title: "My neovim settings",
    description: "Publicly sharing my neovim configuration.",
    image: nvimImg, // Using the variable
    github: "https://github.com/HugeErick/Unsleep",
    techs: ["Lua"]
  },
  {
    title: "UnwantedSearchEngine",
    description: "A lightweight desktop search engine demo with a clean, minimalist interface. Features basic text search with real-time results.",
    image: "",
    github: "https://github.com/HugeErick/UnwantedSearchEngine",
    techs: ["Rust", "Raylib"]
  },
];

let openStates = $state(projects.map(() => false));
</script>

<section class="space-y-8">
  {#each projects as project, i}
    <Card.Root class="overflow-hidden border-2 transition-all hover:border-primary/50">

      <div class="aspect-video w-full overflow-hidden bg-muted/50 flex items-center justify-center p-4">
        {#if project.image}
          <img
            src={project.image} 
            alt={project.title}
            class="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        {:else}
          <div class="flex h-full w-full items-center justify-center text-muted-foreground italic text-sm">
            Visual coming soon
          </div>
        {/if}
      </div>

      <Card.Header class="pb-2">
        <div class="flex items-center justify-between">
          <Card.Title class="text-2xl font-bold">{project.title}</Card.Title>

          <Button variant="outline" size="icon" href={project.github} target="_blank" class="flex items-center justify-center">
            <div data-electric-cursor>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
            </div>
          </Button>
        </div>
      </Card.Header>

      <Card.Content class="space-y-4">
        <p class="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <Collapsible.Root bind:open={openStates[i]} class="space-y-2">
          <Collapsible.Trigger>
            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity cursor-pointer">
              {openStates[i] ? 'Hide Technologies' : 'Show Technologies'}
              {#if openStates[i]}
                <ChevronUp class="h-4 w-4" />
              {:else}
                <ChevronDown class="h-4 w-4" />
              {/if}
            </div>
          </Collapsible.Trigger>

          <Collapsible.Content class="flex flex-wrap gap-2 pt-2">
            {#each project.techs as tech}
              <Badge variant="secondary" class="rounded-md italic text-xs">#{tech}</Badge>
            {/each}
          </Collapsible.Content>
        </Collapsible.Root>
      </Card.Content>
    </Card.Root>
  {/each}
</section>

<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import EducationShowcase from './educationShowcase.svelte';
	import ProjectSchowcase from './projectSchowcase.svelte';
</script>

<div class="md:mx-10 md:my-12 w-full max-w-4xl data-electric-cursor">
	<Tabs.Root value="experience & education" class="z-10 p-6">
		<Tabs.List class="grid w-full grid-cols-2">
			<Tabs.Trigger value="experience & education">Experience</Tabs.Trigger>
			<Tabs.Trigger value="projects">Projects</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="experience & education">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl font-semibold sm:text-4xl"
						>Professional Experience & Education</Card.Title
					>
					<Card.Description>My work history and skills</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<EducationShowcase />
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
		<Tabs.Content value="projects">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl font-semibold sm:text-4xl">Personal Projects</Card.Title>
					<Card.Description>Showcasing my skills and creativity</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-4">
					<ProjectSchowcase />
				</Card.Content>
			</Card.Root>
		</Tabs.Content>
	</Tabs.Root>
</div>

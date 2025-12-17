<script lang="ts">
	import { onMount } from 'svelte';
	import { Separator } from '$lib/components/ui/separator/index';
	import profilePicture from '$lib/assets/p.jpeg';
	import cv from '$lib/assets/cv.pdf';
	import { Linkedin, Github, Instagram, Crown, FileIcon as FileUser } from '@lucide/svelte';
	import { initElectricCursor } from '$lib/electricCursor';

	const description = `I'm a software developer with expertise in full-stack development
              and cybersecurity, love to exercise competitive programming and
              play chess`;

	onMount(() => {
		const cleanup = initElectricCursor();
		return cleanup
	})
</script>

<div
	id="presentationCardParent"
	class="w-full max-w-4xl md:mx-10 md:my-12
    "
>
	<!-- heres going to be the cursor effect  -->
	<div class="p-6" data-electric-cursor>
		<div
			id="hero"
			class="relative z-10
		flex flex-col items-center
		gap-6 rounded-lg border
		border-border bg-(--lightBlack) p-4
		shadow-lg md:flex-row"
		>
			<div class="flex-1 space-y-4">
				<h1 class="text-4xl leading-tight font-semibold md:text-5xl lg:text-6xl">
					Hi, my name is Erick
				</h1>
				<Separator class="my-4" />
				<section class="mb-4 text-lg text-muted-foreground">
					<footer>{description}</footer>
				</section>
				<Separator class="my-4 mt-10" />
				<div class="mx-2 my-2 flex flex-row items-center justify-between px-2">
					<div class="flex flex-row items-center">
						<a
							href="https://www.linkedin.com/in/erick-gonzalez-810883335/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Linkedin
								class="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					</div>
					<Separator class="min-h-6" orientation="vertical" />
					<div class="flex flex-row items-center">
						<a href="https://github.com/HugeErick/" target="_blank" rel="noopener noreferrer">
							<Github
								class="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					</div>
					<Separator class="min-h-6" orientation="vertical" />
					<div class="flex flex-row items-center">
						<a href={cv} target="_blank" rel="noopener noreferrer">
							<FileUser
								class="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					</div>
					<Separator class="min-h-6" orientation="vertical" />
					<div class="flex flex-row items-center">
						<a
							href="https://www.instagram.com/erickgonzalez634/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Instagram
								class="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					</div>
					<Separator class="min-h-6" orientation="vertical" />
					<div class="flex flex-row items-center">
						<a
							href="https://www.chess.com/member/ilovefirouzja"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Crown
								class="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground"
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="flex-shrink-0 overflow-hidden rounded-lg border-4 border-muted">
				<img
					src={profilePicture}
					alt="profile pic"
					class="h-36 w-36
				  object-cover sm:h-44
				  sm:w-44 md:h-48
				  md:w-48 lg:h-56
				  lg:w-56 xl:h-64
				  xl:w-64"
				/>
			</div>
		</div>
	</div>
</div>

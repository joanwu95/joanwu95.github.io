"""Keep extension-generated inline scripts from running twice."""

def deduplicate_scripts(app, pagename, templatename, context, doctree):
    seen = set()
    scripts = []
    for script in context.get("script_files", []):
        body = getattr(script, "attributes", {}).get("body")
        if body and body in seen:
            continue
        if body:
            seen.add(body)
        scripts.append(script)
    context["script_files"] = scripts


def setup(app):
    app.connect("html-page-context", deduplicate_scripts)
    return {"parallel_read_safe": True, "parallel_write_safe": True}

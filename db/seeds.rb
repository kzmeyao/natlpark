# Seed database with national parks, retrieved from Wikipedia

require 'nokogiri'
require 'open-uri'

url = 'http://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States'

data = Nokogiri::HTML(open(url))

first_time = true

data.css("table.wikitable").css("tr").each do |row|
  if !first_time
    name = row.css("th").text
    state = "" + row.css("td")[1].css("a")[0]
    lat =  "" + row.css("td")[1].css(".geo-dec")[0].text.split(" ")[0]
    lon =  "" + row.css("td")[1].css(".geo-dec")[0].text.split(" ")[1]
    date_formed = "" + row.css("td")[2].css("span")[1]
    description = "" + row.css("td")[4]
    description.gsub!(/\[.?.\]/, "")

    park = Park.new(:date_formed => date_formed,
                    :description => description,
                    :lat => lat, :lon => lon,
                    :name => name,
                    :state => state)
    park.save
  else
    first_time = false
  end
end
